require('crypto').randomBytes(48, (err, buffer) => {
  if (err) {
    return;
  }
  const token = buffer.toString('hex');
  console.log(token);
});
