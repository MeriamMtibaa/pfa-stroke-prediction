function MetricsCard({ title, data }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <pre>{data ? JSON.stringify(data, null, 2) : 'Chargement...'}</pre>
    </section>
  )
}

export default MetricsCard

