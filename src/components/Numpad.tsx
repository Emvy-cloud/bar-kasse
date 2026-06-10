type Props = {
  onNumberClick: (num: string) => void
  onClear: () => void
}

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

export default function Numpad({
  onNumberClick,
  onClear,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {digits.map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          className="h-14 rounded-xl bg-gray-200 text-2xl"
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onNumberClick(",")}
        className="h-14 rounded-xl bg-gray-200 text-2xl"
      >
        ,
      </button>

      <button
        onClick={() => onNumberClick("0")}
        className="h-14 rounded-xl bg-gray-200 text-2xl"
      >
        0
      </button>

      <button
        onClick={onClear}
        className="h-14 rounded-xl bg-red-300 text-2xl"
      >
        C
      </button>
    </div>
  )
}