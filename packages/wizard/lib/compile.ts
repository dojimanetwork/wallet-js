export async function compileContracts() {
  const { run } = await import("hardhat");
  await run("compile");
}
