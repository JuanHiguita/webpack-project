//agregamos el modulo path --> para agragar modulos se usa el [require('(nombre del modulo)')]
const path = require('path');
//los plugins tambien se agegan igual que los modulos
//para webpack 4 en adelante se debe de usar mini-css-extract-plugin
const miniExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //usamos path.resolve(__dirname,(nombre archivo)) para obtener la ruta relativa del archivo que estamos buscando
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
    navbar: path.resolve(__dirname, 'src/js/navbarCollapse.js'),
    chart: path.resolve(__dirname, 'src/js/amCharts.js'),
    function: path.resolve(__dirname, 'src/js/funcion.js')
  },
  output: {
    //usamos path.resolve(__dirname, (carpeta)) para ubicarnos en la ubicacion que deseamos
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  //key para modificar a webpack-dev-server = devServer
  devServer: {
    //definimos la ruta por defecto como la carpeta dist
    contentBase: path.join(__dirname,'dist'),
    //abre una pestaña en el navegador automaticamente
    open:true,
    //comprime los archivos como gzip
    compress: true,
    //solo ver los mensajes de error;
    stats:'errors-only',
    //para modificar el puerto del localhost, por defecto es el puerto 8080
    port: 8000,
  },
  module:{
    rules:[
      //aqui van los loaders
      //Loader para cargar css y configuracion del postCSS
      {
        //test -> tipo de archivo a reconocer
        test:/*-> expresion regular /\.css$/*/ /\.css$/ /*le digo al codigo que lea todos los archivos con extesion css*/,
        //que loader se va a ebcargar del archivo
        use:[miniExtractPlugin.loader,
        {
          loader: "css-loader",
          options:{
            //import dentro de css
            modules: true,
            //css-loader trabaje en conjunto de otro loader
            importLoaders: 1
          }
        },
      'postcss-loader'
      ]},
      //Loader para cargar scss
      {
        //test -> tipo de archivo a reconocer
        test:/*-> expresion regular /\.scss$/*/ /\.scss$/ /*le digo al codigo que lea todos los archivos con extesion scss*/,
        //que loader se va a ebcargar del archivo
        use:[miniExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      //loader para cargar un entorno de desarrollo que soporte Ecma
      {
        //test -> tipo de archivo a reconocer
        test:/*-> expresion regular /\.js$/*/ /\.js$/ /*le digo al codigo que lea todos los archivos con extesion js*/,
        //que loader se va a encargar del archivo
        //para configuraciones especiales se abren {} en el parametro use, y dentro de el se configuran los parametros loader y options
        use:{
          loader: 'babel-loader',
          options: {
            //definimos la version de Ecma y react que babel va a compilar
            presets: [['@babel/preset-env', {
              'targets': {
                'node': 'current'
        }}]]}}
      },
      //Por defecto en versiones de webpack 4.0 en adelante el json- loader ya no se usa, debido a que webpack ya soporta este tipo de archivos por defecto
      //loader para cargar imagenes
      {
        //test -> tipo de archivo a reconocer
        test:/*-> expresion regular /\.(jpg|png|gif|woff|eot|ttf|svg)$/*/ /\.(jpg|png|gif|woff|eot|ttf|svg)$/ /*le digo al codigo que lea todos los archivos con extesion jpg,png,gif,woff,eot,ttf,svg*/,
        //que loader se va a encargar del archivo
        //para configuraciones especiales se abren {} en el parametro use, y dentro de el se configuran los parametros loader y options
        use:{
          loader: 'url-loader',
          //url-loader lo que hace es convertir las imagenes que no excedan el limite a imagenes base 64
          options: {
            //con limit establecemos el peso maxiomo de las imagenes que vamos a soportar en el proyecto, el limite es en bits
            limit: 100000,
          }
        }
      }
    ]
  },
  plugins:[
    //aqui van los plugins
    new miniExtractPlugin({
      //config para mini-css-extract
      filename: "css/[name].css"
    }),
  ]
}
