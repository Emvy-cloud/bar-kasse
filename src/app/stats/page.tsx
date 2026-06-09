"use client"

import { useEffect, useState } from "react"

export default function StatsPage() {
  const [sales, setSales] = useState<any>({})
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sales")
    if (saved) {
      setSales(JSON.parse(saved))
    }
  }, [])

  function resetSales() {
    localStorage.setItem("sales", JSON.stringify({}))
    setSales({})
    setConfirmReset(false)
  }

  return (
    <div className="p-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Verkaufsstatistik</h1>

        <button
          onClick={() => setConfirmReset(true)}
          className="rounded-2xl bg-gray-700 px-6 py-3 text-xl font-bold text-white hover:bg-gray-800 transition"
        >
          Admin: Statistik zurücksetzen
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(sales).map(([name, amount]) => (
          <div key={name} className="text-3xl">
            {name}: {String(amount)}
          </div>
        ))}
      </div>

      {confirmReset && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-3xl bg-white p-10 shadow-2xl text-center space-y-6 max-w-md w-full mx-4">
            <h2 className="text-3xl font-bold">Statistik wirklich löschen?</h2>
            <p className="text-xl text-gray-500">Alle Verkaufsdaten werden unwiderruflich gelöscht.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 rounded-2xl bg-gray-200 p-4 text-xl font-bold hover:bg-gray-300 transition"
              >
                Abbrechen
              </button>
              <button
                onClick={resetSales}
                className="flex-1 rounded-2xl bg-red-500 p-4 text-xl font-bold text-white hover:bg-red-600 transition"
              >
                Ja, löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}