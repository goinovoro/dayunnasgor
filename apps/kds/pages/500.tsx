export default function InternalServerError() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 900 }}>500</h1>
      <p style={{ fontSize: '1.25rem' }}>Terjadi kesalahan server. Coba muat ulang halaman.</p>
    </div>
  );
}
