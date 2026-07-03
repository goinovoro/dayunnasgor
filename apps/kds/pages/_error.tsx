function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 900 }}>{statusCode || 'ERR'}</h1>
      <p style={{ fontSize: '1.25rem' }}>
        {statusCode === 404
          ? 'Halaman tidak ditemukan.'
          : 'Terjadi kesalahan. Muat ulang halaman.'}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
