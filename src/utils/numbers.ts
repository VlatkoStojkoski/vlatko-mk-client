const isInRange = (x: number, min: number, max: number) => ((x - min) * (x - max) <= 0);

export { isInRange };