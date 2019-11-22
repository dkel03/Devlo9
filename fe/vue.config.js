module.exports = {
 devServer: {
     proxy: {
         '/': {
             target: 'http://3.87.242.206/:80',
             changeOrigin: true
         }
     }
 },
 publicPath: "./",
 outputDir: "../be/public"
}
