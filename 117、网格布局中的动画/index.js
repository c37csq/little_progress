btn.onclick = async () => {
  const dropper = new EyeDropper();
  try {
    const result = await dropper.open();
    console.log(result);
  } catch {
    console.log('user canceled');
  }
}