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

  var iterationMax = 100;        // Reflète la qualité de notre fractale 
  var width = 600;              // Longueur du canevas
  var height = 450;             // Hauteur du canevas

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

  /* ZOOM  sur le plan de la fractal afin que cell-ci soit proportionnel
   * au canevas 
  */
  var xZoom = width / longueurX;
  var yZoom = height / longueurY;

  /**
   * Dessine une fractale
   */
  function draw() {
      /* Pour chaque point de coordonées (x,y) de mon canevas */
    for (x = 0; x < width; x++) {
        for(y = 0; y < height; y++) {
            /* Consante complexe decomposé en deux partie 
            * (une partie imaginaire et une partie réel) 
            */
            var c_reel = -0.4 ;
            var c_imaginaire = -0.6;

            /* Nombre complexe à l'itération 0 décomposé.
            * Celui-ci est est ajusté au plan de la fractale 
            * (une partie imaginaire et une partie réel) 
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
                var rgb = 'rgb(' + i * 255 / iterationMax + ',' + i * 255 / iterationMax + ',' + '0' + ')';
                ctx.fillStyle = rgb;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
  }
 
  draw();