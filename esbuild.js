import esbuild from "esbuild";
void esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  outfile: "dist/index.js",
  platform: "node",
  target: "esnext",
  logLevel: "info"
});
