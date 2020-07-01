import { loadAsset } from "./asset";
import { initGL, flush, clear, setClearColour } from "./gl";
// @ifdef DEBUG
import { tickStats } from "./stats";
// @endif

const screenWidth = 512;
const screenHeight = 288;

window.addEventListener( "load", async () =>
{
  // @ifdef DEBUG
  console.log( `DEBUG BUILD` );
  // @endif
  const canvas = document.querySelector( "canvas" );
  canvas.width = screenWidth;
  canvas.height = screenHeight;

  initGL( canvas );

  let then = 0;
  let delta = 0;
  function loop( now: number ): void
  {
    delta = now - then;
    then = now;
    clear();
    // @ifdef DEBUG
    tickStats( delta, now );
    // @endif
    flush();
    requestAnimationFrame( loop );
  }
  await loadAsset( "sheet" );
  setClearColour( 25, 25, 25 );
  then = performance.now();
  requestAnimationFrame( loop );
} );