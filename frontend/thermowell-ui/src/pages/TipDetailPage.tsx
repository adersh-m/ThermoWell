// src/pages/TipDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import TipDetail, { type TipDetailModel } from '../components/tips/TipDetail';

import tipsData from '../data/tips.json'

const TipDetailPage: React.FC = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const [tip, setTip]         = useState<TipDetailModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tipId) return;

    fetch(`/api/tips/${tipId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data: TipDetailModel) => setTip(data))
      .catch(() => {
        // fallback or 404 handling
        const localTip = (tipsData as TipDetailModel[]).find((t) => t.id === tipId);
        setTip(localTip || null);
      })
      .finally(() => setLoading(false));
  }, [tipId]);

  return (
    <>
      <PageHeader
        title={tip?.title || 'Tip Details'}
        actions={
          <Link to="/tips" className="text-blue-600 hover:underline">
            ← Back to Tips
          </Link>
        }
      />

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading…</p>
      ) : tip ? (
        <TipDetail tip={tip} />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Tip not found.
        </p>
      )}
    </>
  );
};

export default TipDetailPage;
