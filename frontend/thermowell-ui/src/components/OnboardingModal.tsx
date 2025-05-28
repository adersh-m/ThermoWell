export default function OnboardingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">Welcome to ThermoWell!</h2>
        <p className="mb-4">
          Get real-time heat advisories, personalized tips, and more. Let’s take a quick tour!
        </p>
        <button
          className="btn-primary"
          onClick={onClose}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
