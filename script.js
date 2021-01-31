/**  script.js          29/01/2021
 * pas de copyright, pas de copyleft
 * @author Kevin DUFOUR (Pardival)
 */

 /* Initialisation du context du dessin (2D) */
 var canvas = document.getElementById('canvas');
 var ctx = canvas.getContext('2d', {alpah: false});

 /* Soit la suite Z(n+1) --> Z^2 + C 
  * Avec Z == un nombre complexe
  * Avec C == une constante complexe
  */

  /* De plus (a+bi)(a+bi) = a*a-b*b + 2*abi */

  var iterationMax = 200;        // Reflète la qualité de notre fractale 
  var width = canvas.offsetWidth;              // Longueur du canevas
  var height = canvas.offsetHeight;             // Hauteur du canevas

  /* Plan ou se trouve la fractale 
   * (Ce n'est pas celui di canevas il va donc falloir
   * l'ajuster au canevas)
   */
  var xMin = -2;
  var xMax = 2;
  var longueurX = (xMax - xMin);

  var yMin = -1.2;
  var yMax = 1.2;
  var longueurY = (yMax - yMin) 

  /* ZOOM  sur le plan de la fractal afin que celle-ci soit proportionnel
   * au canevas 
  */
  var xZoom = width / longueurX;
  var yZoom = height / longueurY;

  /**
   * Dessine un ensemble de Julia
   * en fonction de sa consante complexe decomposé en deux partie 
   * (une partie imaginaire et une partie réel) 
   * @param c_reel partie réel
   * @param c_imaginaire partie imaginaire
   */
  function drawJuliaSet(c_reel, c_imaginaire) {
      console.log(c_imaginaire);
      console.log(c_reel);
    /* Pour chaque point de coordonées (x,y) de mon canevas */
    for (x = 0; x < width; x++) {
        for(y = 0; y < height; y++) {
            /* Nombre complexe à l'itération 0 décomposé.
            * Celui-ci est est ajusté au plan de la fractale. 
            * on a une partie imaginaire et une partie réel
            */
            var z_reel = x / xZoom + xMin;
            var z_imaginaire = y / yZoom + yMin;

            /* */
            var i = 0;

            /* Tant que le module de z |z| ne semble pas tendre vers l'infini
            * et que que nous avons pas atteint la qualité maximal de la fractal
            * On procède à la suite Z -> Z^2 + C 
            */
            do {
                var tempo = z_reel;     // pour faire le calcul de z_imaginaire à la bonne itération

                z_reel = (z_reel * z_reel) - (z_imaginaire * z_imaginaire) + c_reel;
                z_imaginaire = 2 * tempo * z_imaginaire + c_imaginaire;

                i++;
            } while ((z_reel * z_reel) + (z_imaginaire * z_imaginaire) < 4 
                    && i < iterationMax);

            /* Si la suite est borné alors on dessine le point de coordonées (x,y) */
            if (i == iterationMax) {
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, 1, 1);
            /* Sinon on dessine un point d'une autre couleur 
            * en fonction de où la boucle c'est areté 
            */
            } else {
                var rgb = 'rgb(' + i/2 * 255 / iterationMax + ',' + i * 255 / iterationMax + ',' + '55' + ')';
                ctx.fillStyle = rgb;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
  }

  function drawMandelbrotSet() {
    /* Pour chaque point de coordonées (x,y) de mon canevas */
    for (x = 0; x < width; x++) {
        for(y = 0; y < height; y++) {

            var c_reel = x / xZoom + xMin;
            var c_imaginaire = y / yZoom + yMin;

            /* Nombre complexe à l'itération 0 décomposé.
            * Celui-ci est est ajusté au plan de la fractale. 
            * on a une partie imaginaire et une partie réel
            */
            var z_reel = 0;
            var z_imaginaire = 0;

            /* */
            var i = 0;

            /* Tant que le module de z |z| ne semble pas tendre vers l'infini
            * et que que nous avons pas atteint la qualité maximal de la fractal
            * On procède à la suite Z -> Z^2 + C 
            */
            do {
                var tempo = z_reel;     // pour faire le calcul de z_imaginaire à la bonne itération

                z_reel = (z_reel * z_reel) - (z_imaginaire * z_imaginaire) + c_reel;
                z_imaginaire = 2 * tempo * z_imaginaire + c_imaginaire;

                i++;
            } while ((z_reel * z_reel) + (z_imaginaire * z_imaginaire) < 4 
                    && i < iterationMax);

            /* Si la suite est borné alors on dessine le point de coordonées (x,y) */
            if (i == iterationMax) {
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, 1, 1);
            /* Sinon on dessine un point d'une autre couleur 
            * en fonction de où la boucle c'est areté 
            */
            } else {
                var rgb = 'rgb(' + i/2 * 255 / iterationMax + ',' + i * 255 / iterationMax + ',' + '55' + ')';
                ctx.fillStyle = rgb;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
  }
 
drawJuliaSet(-0.4, 0.6);