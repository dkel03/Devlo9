module.exports = {
 devServer: {
     proxy: {
         '/': {
             target: 'http://3.87.242.206/:3000',
             changeOrigin: true
         }
     }
 },
 publicPath: "./",
 outputDir: "../be/public"
}
