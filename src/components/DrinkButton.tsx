type Props = {
  name: string
  price: number
  deposit: number
  color: string
  onClick: () => void
}

export default function DrinkButton({
  name,
  price,
  deposit,
  color,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        ${color}
        h-40
        rounded-3xl
        text-4xl
        font-bold
        shadow-xl
        active:scale-95
        transition
      `}
    >
      <div>{name}</div>

      <div>
        {(price / 100).toFixed(2)}€ + {(deposit / 100).toFixed(2)}€
      </div>
    </button>
  )
}