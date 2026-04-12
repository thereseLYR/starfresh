export default function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-gold/65 mb-2">
      {children}
    </label>
  )
}
