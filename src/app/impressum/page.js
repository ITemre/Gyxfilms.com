// src/app/impressum/page.js

export default function Impressum() {
    return (
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Impressum</h1>
        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG:</h2>
          <p>Görkem Yalcin<br />Kiesstraße 6<br />73728 Esslingen am Neckar</p>
  
          <h2 className="text-xl font-semibold mt-6 mb-4">Kontakt:</h2>
          <p>
            Telefon: +49 17620431022<br />
            E-Mail: <a href="mailto:info@gyxfilms.de" className="text-blue-500">info@gyxfilms.de</a><br />
            Webseiten: <a href="https://www.gyxfilms.com" className="text-blue-500">www.gyxfilms.com</a>,{' '}
            <a href="https://www.gyxwedding.de" className="text-blue-500">www.gyxwedding.de</a>
          </p>
  
          <h2 className="text-xl font-semibold mt-6 mb-4">Umsatzsteuer-ID:</h2>
          <p>DE53642018191</p>
  
          <h2 className="text-xl font-semibold mt-6 mb-4">Verantwortlich für den Inhalt:</h2>
          <p>Görkem Yalcin<br />GYXFilms<br />Musterstraße 1<br />12345 Musterstadt</p>
  
          <h2 className="text-xl font-semibold mt-6 mb-4">Haftungsausschluss (Disclaimer):</h2>
          <h3 className="text-lg font-semibold mt-4">Haftung für Inhalte</h3>
          <p className="text-sm mt-2 leading-6">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich...
            {/* Der Rest deines Textes */}
          </p>
  
          <h3 className="text-lg font-semibold mt-4">Haftung für Links</h3>
          <p className="text-sm mt-2 leading-6">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben...
          </p>
  
          <h3 className="text-lg font-semibold mt-4">Urheberrecht</h3>
          <p className="text-sm mt-2 leading-6">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht...
          </p>
        </div>
      </div>
    );
  }
  