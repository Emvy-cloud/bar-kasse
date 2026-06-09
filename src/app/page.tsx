"use client"

import { useState, useEffect } from "react"

import { drinks } from "@/data/drinks"
import DrinkButton from "@/components/DrinkButton"
import Numpad from "@/components/Numpad"

export default function Home() {
  const [order, setOrder] = useState<any[]>([])
  const [receivedMoney, setReceivedMoney] = useState("")
  const [deposit, setDeposit] = useState(0)
  const [sales, setSales] = useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return {}
    const saved = localStorage.getItem("sales")
    return saved ? JSON.parse(saved) : {}
  })

  function addDrink(drink: any) {
    setOrder((prev) => [...prev, drink])
    setSales((prev) => ({
      ...prev,
      [drink.name]: (prev[drink.name] || 0) + 1,
    }))
  }

  function addNumber(num: string) {
    setReceivedMoney((prev) => {
      if (num === ",") {
        if (prev.includes(",")) return prev
        return prev + ","
      }
      const parts = prev.split(",")
      if (parts.length === 2 && parts[1].length >= 2) return prev
      return prev + num
    })
  }

  function clearNumber() {
    setReceivedMoney("")
  }

  function undoLast() {
    const lastItem = order[order.length - 1]
    if (lastItem) {
      setSales((prev) => ({
        ...prev,
        [lastItem.name]: prev[lastItem.name] - 1,
      }))
    }
    setOrder((prev) => prev.slice(0, -1))
  }

  function addDeposit() {
    setDeposit((prev) => prev + 200)
  }

  function newOrder() {
    setOrder([])
    setReceivedMoney("")
    setDeposit(0)
  }

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales))
  }, [sales])

  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === "sales") {
        setSales(e.newValue ? JSON.parse(e.newValue) : {})
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])


  const total = order.reduce((sum, item) => sum + item.price + item.deposit, 0)
  const finalTotal = total - deposit

  const receivedMoneyValue = receivedMoney
    ? Math.round(parseFloat(receivedMoney.replace(",", ".")) * 100)
    : 0
  const change = receivedMoneyValue - finalTotal

  return (
    <main className="flex h-screen bg-gray-100">
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-3 gap-6">
          {drinks.map((drink) => (
            <DrinkButton
              key={drink.id}
              name={drink.name}
              price={drink.price}
              deposit={drink.deposit}
              color={drink.color}
              onClick={() => addDrink(drink)}
            />
          ))}
        </div>
      </div>

      <div className="w-1/4 border-l bg-white p-4 flex flex-col gap-4">
        <div className="text-5xl font-bold">
          {(finalTotal / 100).toFixed(2)}€
        </div>

        <div className="text-lg text-gray-600">
          Brutto: {(total / 100).toFixed(2)}€
          <br />
          - Pfand: {(deposit / 100).toFixed(2)}€
        </div>

        <Numpad onNumberClick={addNumber} onClear={clearNumber} />

        <div className="text-3xl">Erhalten: {receivedMoney}€</div>

        <div className="rounded-2xl bg-green-300 p-6 text-4xl font-bold">
          Rückgeld:
          <br />
          {(change / 100).toFixed(2)}€
        </div>

        <button
          onClick={addDeposit}
          className="rounded-2xl bg-yellow-300 p-6 text-2xl font-bold hover:bg-yellow-400 transition"
        >
          - Pfand
        </button>

        <button
          onClick={undoLast}
          className="rounded-2xl bg-red-400 p-6 text-3xl font-bold text-white hover:bg-red-500 transition"
        >
          Storno
        </button>

        <button
          onClick={newOrder}
          className="rounded-2xl bg-blue-400 p-6 text-3xl font-bold text-white hover:bg-blue-500 transition"
        >
          Neuer Vorgang
        </button>
      </div>
    </main>
  )
}