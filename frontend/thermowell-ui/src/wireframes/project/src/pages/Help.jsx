function Help() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Help & Support</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                What should I do during a heat emergency?
              </h4>
              <p className="text-gray-600">
                Stay indoors in air-conditioned spaces, drink plenty of water, and avoid strenuous activities.
                If you must go outside, wear light clothing and take frequent breaks.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                How do I recognize heat exhaustion?
              </h4>
              <p className="text-gray-600">
                Common symptoms include heavy sweating, weakness, dizziness, headache,
                nausea, and cool, moist skin. Seek medical attention if symptoms persist.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Where can I find a cooling center?
              </h4>
              <p className="text-gray-600">
                Cooling centers are available at community centers, libraries, and other public facilities.
                Check the Resources page for a complete list of locations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Help;