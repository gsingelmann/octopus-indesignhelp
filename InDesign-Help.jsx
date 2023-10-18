/* ----------------------------------------------------------------------------------------------------------------------
//DESCRIPTION:Experimental script that uses OpenAI to answer questions about Indesign

+    This script is part of project-octopus.net

+   Author: Gerald Singelmann, gs@cuppascript.com
+   Supported by: Satzkiste GmbH, post@satzkiste.de

+    Modified: 2023-04-26

+    License (MIT)
		Copyright 2023 Gerald Singelmann/Satzkiste GmbH
		Permission is hereby granted, free of charge, to any person obtaining 
		a copy of this software and associated documentation files (the "Software"), 
		to deal in the Software without restriction, including without limitation 
		the rights to use, copy, modify, merge, publish, distribute, sublicense, 
		and/or sell copies of the Software, and to permit persons to whom the 
		Software is furnished to do so, subject to the following conditions:
		The above copyright notice and this permission notice shall be included 
		in all copies or substantial portions of the Software.
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
		OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
		THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
		DEALINGS IN THE SOFTWARE.
// ---------------------------------------------------------------------------------------------------------------------- */

#targetengine "octopus_help"
#include "./includes.jsxinc"
init(); 
log_run();

_ui( "Octopus Hilfe", get_script_version() );

function _ui( title, version ) {
	var position = app.extractLabel('octopus_position_' + title);
  if ( position != "" ) {
		position = JSON.parse( position );
  }

	var ui_is_light = app.generalPreferences.uiBrightnessPreference > 0.5
	
  var width = 500;

  var w = new Window('dialog', title, ( position ? { x: position.x, y: position.y} : undefined ) );
  if ( "i want to be able to collapse this block") {
    w.orientation = 'column';
    w.alignChildren = ['fill', 'fill'];
    w.fish = w.add( 'group {orientation: "row", alignChildren: ["fill", "bottom"]}');
    w.main = w.add( 'group {orientation: "column", alignChildren: ["fill","fill"]}');
    w.btns = w.add('group {orientation: "row", alignChildren: ["right", "fill"]}');
    w.footer = w.add('group {orientation: "row", alignChildren: ["right", "fill"]}');
    
    var _fl = w.fish.add("group {alignChildren: ['left', 'bottom']}");
    var _fr = w.fish.add("group {alignChildren: ['right', 'bottom']}");
    // experimental.png
    _fl.add("image", undefined, unescape("%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%CC%00%00%00I%08%02%00%00%00%3F%B3%81%0E%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD%7E%FC%00%00%20%00IDATx%9Cb%7C%F3%ED%0B%C3%28%18%05%A3%60%14%8C%02%1A%00%06%06%06%00%00%00%00%FF%FFb9%F6%F8%01%84%F5%EA%EBhi%3B%0AF%C1%28%18%05%E4%031n%1E4%CD%0C%0C%0C%00%00%00%00%FF%FFb%81%B3%F6%DE%BB%0Da%BC%FF%F1m4%94G%C1%28%18%05%A3%00%0F%10%E4%E0%C2%94%8D%D45D%13a%60%60%00%00%00%00%FF%FFb%C1%14%3A%F7%FC%C9h%D8%8E%82Q0%0AF%01%1E%E0%AC%A8FL%F0000%00%00%00%00%FF%FFb%1A%0D%C6Q0%0AF%C1%28%A0%11%60%60%60%00%00%00%00%FF%FF%1A-dG%C1%28%18%05%A3%80V%80%81%81%01%00%00%00%FF%FF%1A-dG%C1%28%18%05%A3%80V%80%81%81%01%00%00%00%FF%FF%1A-dG%C1%28%18%05%A3%80V%80%81%81%01%00%00%00%FF%FF%1A-dG%C1%28%18%05%A3%80V%80%81%81%01%00%00%00%FF%FF%C2%B2%BA%60%C0%81%A8%28%3F%27%3F%FBO%E6%BF%DF%FE%FC%BA%FB%E1%AD%AE%B8%14%C4E%3F%7F%FF%FE%FB%EF%1F%1F%0B%07%C3%F7%FFO%1F%BD%19M%16%A3%60%14%8C%82A%0E%18%18%18%00%00%00%00%FF%FF%1AD%85%AC%84%A4%D0%7F%3E%C6%BB%1F%DF2%B0%FF%D0%13%12%D2%95%90%D2%93%90%16%E7%E1ESv%E9%C5%B3%7B%EF%DE%BCg%FD%21%CC%C2%F9%FA%C1%C7%1F%3F%7F%0D%90%7BG%C1%28%18%05%A3%80%00%60%60%60%00%00%00%00%FF%FF%1A%F8B%96%83%9DMT%81%FF%F5%EFow%BF%BF%13%FF%C7%5B%E7%E4%A9%27%21%85G%BD%1E%A8%F0%95%0A%D0%D2%DBp%ED%D2%BAo%17%84%3Eq%7F%F8%F8%95%8E%EE%1D%05%A3%60%14%8C%02b%01%03%03%03%00%00%00%FF%FF%1A%C8B%16R%BC%BE%FD%F3%DDN%5D%8D%87%8D%7D%C3%B5KuN%1E%DCl%ECDj%0F%D0%D2%E3fc%DBt%F5%12%C3G%1A%3Bt%14%8C%82Q0%0A%C8%02%0C%0C%0C%00%00%00%00%FF%FF%1A%B0BVZN%E4-%CBwcE%85%00-%3D%06%06%86%F2%1D%1B%8Bl%9C%88/a%21%C0UE%E3%F8%A3%07%82*%9C%8F%EE%BC%A2%9DSG%C1%28%18%05%A3%80%3C%C0%C0%C0%00%00%00%00%FF%FF%1A%80B%96%83%9D%8DU%86%5DX%98%B7%CA%0C%DAn%7D%F9%E5%B3%A5%9C%22%E6%F0+%7Ep%EF%DD%9B%E3%8F%EE%BF%FA%FA%E9%D7%9F%BF%F4%F7%C5%28%18%05%A3%60%14%10%04%0C%0C%0C%00%00%00%00%FF%FF%A2w%21+%21%29%F4%9C%F5K%96%B9%0D%F2%C0%EB%CB/%9F%F1%8F%C3b%05JB%22JB%22%D1%06%A6%E5%3B6%FE%E4g%1C%1D%99%1D%05%A3%60%14%0C6%C0%C0%C0%00%00%00%00%FF%FF%A2%EB%3AYY%25Q.q%CEn%8F%80%CB/%9E%E6l%5E%B5%FB%CE%0D%88%B8%B2%90%B0%92%90%08IFm%B8v%E9%E5%97%CF%10%B6%9E%84%147%3F%27%0D%DC%3B%0AF%C1%28%18%05%14%01%06%06%06%00%00%00%00%FF%FF%A2_%21+%21%29%24%28%C2S%E7%E41%E3%D4Q%5D%09i1n%3E%15a%D1%99%A7%8En%B8v%89%A4%A1%D8W_%3E/%BDp%9A%9B%8D%0D%3E%BC%A0%24%24%C2%C4%C9H3%87%8F%82Q0%0AF%01%99%80%81%81%01%00%00%00%FF%FF%A2_%21%FB%8B%EF%7F%BA%99%F5%D7_%3F%C5yx/%BFxZ%E7%E4%F1%FF%FF%FF%CB/%9F%5Ez%F1%8CxC%BE%FE%FA%B9%EA%F2y%17%15%0DW%15%0D%B8%20%A9%D3e%A3%60%14%8C%82Q@%1F%C0%C0%C0%00%00%00%00%FF%FF%A2%D3%98%AC%AC%92%A8%9D%BA%1A7%1B%FB%BDwo%C4yx%21+%0A%94%84Dj%1D%3DI%9A%EFZr%E1L%A8%AE%21%9A%16%1E66%1A8y%14%8C%82Q0%0A%28%05%0C%0C%0C%00%00%00%00%FF%FF%A2SK%F6%1B%CB%1F+9E%06%06%86%9C%CD%AB%EF%BDC%EC%88%25%BE%84%7D%F9%E5s%DF%91%7Dz%12R%98ZF%5B%B2%A3%60%14%8C%82%C1%09%18%18%18%00%00%00%00%FF%FF%A2SK%96%87%83%03R%14%CE%0F%8E%21%A9%E9z%EF%DD%9B/%BF%7E%5D%7E%F1%F4%F8%E3%FBE%D6NX%E7%C7%E03%60%A3%60%14%8C%82Q0%A8%00%03%03%03%00%00%00%FF%FF%A2SKV%8A%8F%1F%C2%E0ac%BB%F4%E2%19%F1%C5%227%1B%FB%D7_%3F_%7E%F9%CC%CD%CAN%EAB%DAQ0%0AF%C1%28%18X%C0%C0%C0%00%00%00%00%FF%FF%A2GK%96%83%9D%0DR%B6%DE%7E%FB%EA%CD%D7%AF%96r%8A%C4%8F%A2%8A%F3%F0%8A%F3%F0Z%CA%29%1E%7Ft%7F%C9%853%AE*%EA%98%8D%D9%97_%3E1%FE%1D%5D%5D0%0AF%C1%28%18t%80%81%81%01%00%00%00%FF%FF%A2G%21+%20%C4s%FC%F1%FD/%BF%7E%C5%18%98%90%3D%7Ej%29%A7h%09%1E%D5%C5%04%F7%DE%BD%FD%F5%F5%0F%15%1D%3C%0AF%C1%28%18%05T%01%0C%0C%0C%00%00%00%00%FF%FF%A2%DF%8E%AFt3k%1A%99%7C%F9%E5%D3/%CFG%87eG%C1%28%18%05%83%0E000%00%00%00%00%FF%FF%A2%C7%98%EC%87w_%B8Yi%B5%00%E0%E5%97%CF%8C%FFhd%F6%28%18%05%A3%60%14P%04%18%18%18%00%00%00%00%FF%FF%A2G%21%FB%E3%E7%AF%97_%89ji%1E%7Ft%9FT%C3%F7%DC%B9%21%F0%9F%83%2Cw%8D%82Q0%0AF%01m%01%03%03%03%00%00%00%FF%FF%A2%D3p%01/%0B%96%99%AE%DDwn%28%83%0Fy%81p7%5C%BB%E4%AA%A2%7E%E9%C5%B3%E3%8F%EE%1F%7F%7C%9F%87%8D%CDRV%D1EE%03%FF%A2%82%5Dwnp%BE%A4%99%BBG%C1%28%18%05%A3%80%02%C0%C0%C0%00%00%00%00%FF%FF%A2S%21+%C0%C2q%EF%DD%9B%0D%D7.100%FC%FD%FD%97%8B%95%ED%E3%AF%1F%CF%BE%7E%2C%B2v%82%ABy%F9%E5s%CE%E6%D5%5Er%1A%95j%B6%CCj%F6s%9F%9D%F7%D3%D2%C54j%F7%9D%1B%F0%3D%B5K/%9C%96%E3%E4%7F%FC%F35%7D%7C1%0AF%C1%28%18%05%24%01%06%06%06%00%00%00%00%FF%FF%A2%D3%3A%D9%1F%EF%7E%5Dz%F1%AC%C8%C6%89%8B%91u%9Fs%CA%14%23%DF%C5%16%A1%9Er%1A%C8%EB%B1%5CU%D43%B5%2C%E7%99%07%B7%9F%DFo%22%24%CD%CB%88%D2%F8%85%AC%96%3D%FE%E8%3E%0F%1B%3B%E4%F8%AE%97_%3E%1F%7Ep%F7%F5%83%D1%7B%11F%C1%28%18%05%83%14000%00%00%00%00%FF%FF%A2S%21%FB%FA%F5%C7%23%0F%EF200%C8%F3%08000%1Cx%7Eo%C1%ED%B3%2C%0C%28%B6+%09%89%08%B2%81N%2C%7C%F0%E5%3D%03%03%C3%C7_%DF%91e%8F%81%87k/%BDxf%29%A7x%19%7C%A6L%DF%91%7D%BC%9FYF/R%1C%05%A3%60%14%0CZ%C0%C0%C0%00%00%00%00%FF%FF%A2%DF%29%5C%EC%FF%98%EF%BD%7Bs%EF%F3%BB%0F%BF%BE%3BH*9K%29%3F%FB%89%3E%1B%B6%EA%E1%E5%3B_%DEnp%8E%EB%BF%7D%F4%EB%FF%DF%C8R%E2%3C%7C%C7%1F%DD%87%B4g%BF%FC%FA%D5wd%1F%DB_%C6%D7%AFG%9B%B1%A3%60%14%8C%82%C1%0B%18%18%18%00%00%00%00%FF%FF%A2%DF%3A%D9%AF/%BE%ED%BEs3%C1%CC%A2%F4%CAN1v%EE%BB%9F%DF%85%19%18%A1%A9%A9vro%B8%B0%FF%C1%BBwfr%F2%D1%06%A6%E8%26%80%8FI%84l%C9%7D%F9%F1%D3%CB%9Bo%E9%E6%F8Q0%0AF%C1%28%20%03000%00%00%00%00%FF%FF%A2_%21%FB%E1%E3%D7%CF%DF%7Fp%B3%B1%07%19%18200%D8%E0P%86Y%B6B%C0%D7_%3F%21G%19%CC%3A%7D%84%F1%1F%C3%E7%BB%A3%BB%0FF%C1%28%18%05%83%1D000%00%00%00%00%FF%FF%A2%EB%1D_%AF%89%5B-%0B%01%90%93g%E17-%EE%BEs%F3%EB%AF%9F%F7%DE%BFQ%E3%13%7D%FBht%94%60%14%8C%82Q0%04%00%03%03%03%00%00%00%FF%FF%A2k%21%0B%3F%8B%EB%D2%8Bg%04oN%FC%F2%EB%D7%EE%0Bg%F6%DC%BD%21%C1%05%5D%27+%C0%C2%A1%F0%87%FF%E9%CD%D1%05%5B%A3%60%14%8C%82%A1%01%18%18%18%00%00%00%00%FF%FF%A2%B4%90%95%90%14b%E6c%FE%F4%E7%87%00%0B%C7%EFO%7F_%3C%7F%87G%A5%BC%900%84%7D%F9%C5Sx%21%FB%F2%CBg%AC%DB%0D%F4%24%A4%20Gt%9F%BEv%FF%E9%23%D09%DF%9F%19F%87%08F%01u%C0W.%94k%E4Y%7F1%B1%FD%19%3D%C8m%14P%1F000%00%00%00%00%FF%FF%A2%A8%90%95U%12%15%14%E1I7%B3%86%9C%FAz%EC%D1%FD%3D%B7n%FC%7C%FE%03%EB%ED%DC%FF%F9%18%B1%1E%A3%B5%E7%CE%0D%C88%2Cr%F3%B6%EF%C8%BE%22%1B%D0%3E%85%00-%BDC%F7%EF%D0%21%EE%FF21%FCe%FA%FF%9B%0D%E5%1C%04%D6_L%CC%FF%18%99G%CFF%18v%E0+%E7%DFh%7D%13%88%AF.%BDxv%EF%C1K%B6%3F%CC%23%3DPF%01%0D%00%03%03%03%00%00%00%FF%FF%22%BF%90%15%E0%E7%96%91%12%86%9F%AD%C5%CD%C6%EE%AA%A2a%25%A7X%BFw%9B%28%1B%0B%DA%E2*QQ%7Eq%7E%3EH%8B%F5%EB%AF%9F%97%5E%3C%8B%06%8B_z%F1LWB%1A%A2%06%DE%BC%BD%F7%EE%CD%AD7%AF%E0zCu%0D%B71%5C%7EL%B3Q%82%1F%EC%FF%7E%F11%FCg%60%90%E6%E3%D7%10%93%10%E4%84%DE.%FE%FE%FB%F7%1B%AF%5E%3C%FD%F4%91%91%81%81%ED%13%03%C7OJ%97%BB%FDeb%F8%C1%81h@1%FFe%A4%DC%CCa%00%5E%09%A3%ACt%E6%FE%CE%CC%FD%0D%BD%BC%23F%0D%A9%001%C5z%E1%F4%BD%07%A3%5B%B3G%01M%00%03%03%03%00%00%00%FF%FF%22%BF%90%E5%13%E5vUQ%87s%EF%BD%7B%A3%24%24%C2%CD%C6%DE%E8%EC%D5uh%AF%28x%03%02D%8A%83%9D%ED+%DF_xq%BC%E1%DA%25%F8%F8%00D%17d%D0%00%5E%DA%DE%7D%F7F%94%81%0B%BE%7D%D6RNq%F7%9D%9B%A2%A2%FCT_%15%FB%9F%91%E1%AB%D0%7F%21%5E%EED%13K%5C%87%D5B%8E%AD%99%7B%FA%D8%BB/%DFx%DF11%FE%27%DF%BA%1F%1C%7F%95%14%C4%E1%AD%F5%A5%17%CFp%FC%1C%BD%02%12%04%B6%C5gB%18K/%9C%DEp%E2%3C%D9jF%C1%28%18l%80%81%81%01%00%00%00%FF%FF%22%BF%90e%E2%60%82%94%8F%1B%AE%5D%BA%7C%FB%F1o%C6%7F%9C%BClI%A6V%E2%3C%BC%8D.%5ES%8F%1F%E2%10b%7B%7C%F3%B5%A8%28%3F%8B%08k%AA%B95d%9D%C0%A5%17%CFv%DE%BE%1Ekh%061d%CF%DD%1BS%B4%C2%D0%EE%E9z%F5%E5%F3%E3%7B%AF%0Fp0Z%C9%29Bt%15%DB8V%EF%DC%CC%80%AD-+%C0%CF-%25%23%A4*%25%F1%F4%C3%FBW%EF%3F%3D%BA%F3%0A%8B%22%1C%E0%1B%FF%7F3%05%852%7B%17%FC%CA%20%E7%85w%1D%DCs%FA%EF%03%EE%0F%14%8D%DC%E9IH%C1%1BPK/%9E%A1%C4%A8Q0%0AF%C1%E0%07%0C%0C%0C%00%00%00%00%FF%FF%22%BF%90%15%E3%86%B6F/%3D%7Cr%EF%EE%0B%06%06%06.v%B6%A9%3F%0F%DA%AA%A8%B8%AAhd%5B%DA%5Dz%F1l%29%F3i%25%21%11%F8%85%08/%BF%7C%9Ew%FA%98%28%27%8F%1E%B8%D1%8A%7C%D9%D7%E5%17O%E1-%D9%5Bo@%A5%E9%D7%A7_%A7%9E8%5Cf%E7%02%19%8BH2%B5Z%CDt%06s%D0@AM%BC%C0%D6%F1%D2%8Bgn%EA%EAw%DF%BD%DD%C8y%F1%E9%AD7%C4%EC%B5%FD%CB%C4%F0%87%F5%7F%B6%A5-%5C%04r6%02dA.%C4RK9Ex%A3%3B%DB%D26%E6%D1%FD%BFL%A3C%B4%A3%60%14%8C%02b%01%03%03%03%00%00%00%FF%FF%22%BF%90%E5%E7%E6%84t%A5%7F%7E%85%EE%7F%FD%C7%C0%F0%E8%DA%CB%3D%7F%FF%7C%FD%F5+@K%0F%B4%3C%C0%C3%1F%AE%FE%DE%BB7%B3O%1E%E5%F8%C2%FC_%90%09Rr%1D%BE%7FGKT%12%22%7B%F7%DD%5Bx%21+%C8%CE%F9%10%BCy%81%EF%03%F7%F1G%F7%21%1Dy%3D%09%A9%CB%D2%92h%0B%18%A4%E5D%CC%E5%15%9A%F7l%FF%FD%ED%0F%27%27%9B%B7%AEn%B4%B1%E9%CC%DFG%7E%DC%20%BC%19%EC7%EB%3Fm1%09%F8u8%C7%1F%DDo%DE%BF%83%F7%0F%EB%BF%DF%D0B%94%89%95i%D6%E9%A3%B5%8E%1E%10%07p%B3%B1k%8BI%DC%F9%F4%82%19c%20%15T%5E%B3%FC%FB%C3%822%94%C0%FA%8B%89%89%81%81%05%EF%9C%F5/%24-%AC%7F%19%D1%C6%22%FE32%FCf%FE%FF%87%E5%FF%7F%26%A8%04%E3%3FF%96%3F%8C%98*1Mc%60%60%80L%97%FFa%F9%FF%0Bf%02%E3%3FF%B6%3F%8ChN%228R%FC%83%FD%DF_f%84%C9%1C%3F%981%AB%19%88%15%F0%10%60%FD%C5%84%D5G4%05%98%C1%C5%02%F2%2C%13I%95%22ya8%0AF%01.%C0%C0%C0%00%00%00%00%FF%FF%EC%5C%CBN%C2@%14%1D%FA%80j%81%D6bx%0B%84%95l%8C1JB%DC%EA%C2o%F0%03%FC%057%C6%8F%E0Gt%AD%1B%16%E2%CA%05%EA%02%0C%81%80%01%A2%B4c%87%A6%95%BE%18%83m%0A%211%24%1Aw%DC%DDlN%EEL2gn%CE9%99%BFF%B8ZPT%D1g*%B3I%84%89%10%B3%A6@%ED%B51%7C0%89%FBn%FB%ACx%E8%7D%B2u%D3%AC%DF%BE%D4Q%5B%99%24%A8%F3%E2%B136%B6%24q/%BD%E5%E2%7C%88%1E%E6@q%B5%D7n%F3%FD%8A%AA%ED%C4%93%0E%15%9E%EE%1E%5C%8AC%06%FA%BDA%D5Z%C7%AC%3F0%D6M%9A%215U%BF%7E%AE%5D%1C%9D%94r%F9%3B%C9Z*%E0%DA%24.%C4%E2%DE%B2%5C%AD%F0%88%FE%BET3G%85%A4%E8r%B5%E2%C9%B5%85X%BC%D1%1E%CC%83X%14%D6%C3%C0%22q*%CC%95%B23U%D71%CDDM%D5%91%C9j%A4*%60%D5g%06%08*%3A%17V%DB%8ED%0D%DEe%B7%9E%82%B0%8C%03%86%CBn%D3%A8%03O%C8%BEq%9E%8Fdx%21%C5%B9%F9%E2%0E%84%7D%05%B5d%89%C7%0C%29O%16%E8C%E6%CC%3C%EF%86%E4Z%B2%24%20Z%DB%C0%0CM%EF%27%D2%0EB%07%C2%C7%B7%FE%D8%B0%194c%FF%A5J%F1%28h-%18%F1%9E%E9d%13%C0%E4%C0%880%92%C10K%FB%8B%99%1C%00%A0%8FPG%86N%0F%2C%A6Y%F8%EF%7Cd%13%C0%08a%85%9An%3F%19%E2%B2%82%E0%E4%AC%9F%06%3D%A7%87%C0h%C9k%E7%D5%EF%CEpU%AB%FA%A9%00%00_%00%00%00%FF%FF%22%BF%90%85%F7%F49%B8%D8%F9%C5%B8%DF%7E%FBj%AB%A0%7C%8E%F5%F1%E7%B7%DF%1E%DF%7B-%C0%CF%3D%FF%F8%B1_%8C%FF%24y%F9%3F%7C%FF%F6%EF%C7%BF%8F%8F%3Fs%CBs%7BhhAJ%DE%A5%17Ns%FD%81%16%3A_%7F%FDD%3E%D5%9B%ED%3F%A2%25%F5%F3%F9%0F%F8%A0%01%03%03C%99%9Ds%F7%BF%3D%0F%AE%BC%80p%059%B8@%D4%F7%FF%CC%ECL%AA%0Ab%E7%9E%3C%FE%FA%EB%A7%A5%9C%E2%D9%FB%0F%B0%0E%E0%E2%01%1F%7E%7E%17%FB%83%3E%0D%C5%F6%87%F1%D5%CF%EF%B84%FDb%F9%FFM%F0%7F%82%B1y%80%96%1EV%05K/%9C%DEq%FE%0A%C3%B7%7F%BF%99%FF%CF%0F%8CA%5B%0E%DC%E7%13%8C%ACr%C3%89%F3%EC%E0%BA%E3%0F%CB%FF%CF%02%FF%C2%F4%F4%02%B4%F4%B0%DE%3B%F9%F5%D7%CF%0D%D7.%AD%BAt%9E%F7%03%13Z%3E%9F%E2%1F%06a%04.%99%FDY%E0_%A2%B1%05%A6%DB6%5C%BB4%FF%CC%09%BEw%88%06%29%C1%91b%AC%13%F10w%1A%E2r%E7%A5%17%CF%3A%F6%EC%04%F7ph%08%20%CE%08%D0%D2%0B%D33%C4t%C6%D7_%3Fw%DF%B9%B9%E0%ECI%8EO%FF%89%5C%CBA%5E%18%8E%82Q%80%15000%00%00%00%00%FF%FF%22%7F%09%D1%AF_%A0%0Bb%21%7D%FC%03%F7o%7F%BC%FBi%D3%D5K%21%BA%86%DC%12%5C%90%93%0A%1E%DF%7C%FD%F2%C6%DB%0B%A7%EF%FDx%FB%EB%27%F3_qu%E1x%13%0B%C8%82%81%DDwn%7C%F8%F2%8D%91%89Q%19%5C%E0%DE%7D%F7%96%9D%11%7Bq%FF%E1%E3%D7wO%3F/%BDp%1A%C2%E5fc%8F31%97%D3%12%87p_%7F%FB%C2%C3%C6%F6%9A%E9%DB%E3O%1F%94%84D%B8%18Y%EE%BE%7B+%CE%C3%FB%8B%C6%19%1B%02%7E%08%FE/%B7w%C1U%C2B%0Eo%FC%CB%0Ab%FC%FA%F7%07%FF%FD%0E%C8%E0%9B%E0%FF%1C+%BBh%03S%5C7%FBr%B3%B1G%1B%98%26%9AX%7C%13%C4%D9%1B%97%E3%13%B0%96W%C2%EA%B6%00-%3Dky%A5_%BC%94%F6%E4%FF%F02%86%E9%19%E2q%27%7D%C07%C1%FF%89%26%16%89%26%16X%9D%C1%CD%C6%1E%A0%A5%D7%E7%1D%F8%83%0F%D4%E0%25%09%D0%21%0CG%C1%B0%07%0C%0C%0C%00%00%00%00%FF%FF%22%BF%25%FB%ED%0B%E8%D4Ae%21%E1%FF%7C%8Cb7%D9%7E0%FC%FA%02%3E%25%8B%97%13q%E3%96%82%82%D8O%CE%7F%E6%F2%8A%AE*%EA%C8%A3%9F%AB/%9Dgz%FE%87_%81%17%D2%AA%BD%FC%E2%29%E7%3F%16%F8%8C%13%04%08%F0s%F3%89r%FF%FD%F5%EF%E9%A37%AC%9C%CC%BBy%A0+%BA%94%84D%3C%B5%B4%B7%FD%F8%F7%F8%DEk%A6%F7%FF%96%5C8%93ce/%CE%C3%3B%EB%C4%91%DF%9F%A0%BDo6%06%9A%AF%3F%FD%C5%F2_%80%83%13y%E1%D7%BDwo%D0%EE%28%BB%FB%EE-%EBo%26%06%86%7F%7C%CC%1C%7DG%F6%89%F3%F0%EAJH%23%3A%E6%B0%9A%03%3C%3C%7D%97%F9/%23%C4X%0EVV%F8%D5%0F%90%E0%BA%F7%0E%3A%96%A2%24%24%02%B71@Ko%D5%A5s%BFX%FE%60%DD%AA%94o%E3%08ipABUIH%04%3E%EA%C2%C0%C0%10%A2kp%FA%C9C%06%CAV%C4%7Db%FA%05/%80%5E%7E%F9%3C%F9%E8%81s/%9E@%B8%EC%CC%2C%D2%BC%FC%7F%FE%91S%D5%81FEQ%B7c%E1W%CC%C6%C2%02w%06%A4%DDz%FE%C9%E3%B7%DF%BF%EAIHY%C8+AB%5BIH%C4JN%F1%D4%B7%7B%3C_IX%5DK%870%1C%05%C3%1E000%00%00%00%00%FF%FF%22%BF%90%FD%F4%FA%EB%86k%97%D2%CD%AC%C5%F9%F9%7E%F2%23vy%29%8B%88%DE%60x%0C%9A%95R%17U%95%96@%3EU%EB%E5%97%CF%7B%EE%DC%B8%F6%E2%05%D3%F3%3F%3F%7E%FE%92%E7%82.%FB%BF%F5%E6%F5%8F%CF%BF%EE%BD%7B%83%5Cf%C9%A8%88fZ%DAl%B8v%89%89%85%F1%F1%BD%D7%7BX%FF%81oO%80%AE%9C%FD%F2%EB%E7%21%06%86%C7%F7%5E%FF%FE%F5g%CD%97%B3%FF%FF%FD%7F%7C%EF%B5%9C%8A%98%9E%84%14%E8%FE%DA%BF4%1F%2C%FB%CD%F6%CFJF%0E%CE%5Dz%E1%F4%AAK%E7Y%BF3%20O%F5%B0%F2%B0%FE%FB%F6%87%83%81%89%E1%E3%9F%E3W%EE%80%8A%0F%13%06%E4%D1O%EE%EF%88%3C%CF%F1%9B%19b%AC%BD%BC%12%5Cp%CA%F1C%FB%EE%DCd%FE%0A5%F4/7%A3%93%8Az%8E%A5%1D%84k%25%AFt%F0%C3%0D%AC%5B%95%94%84D%D2%D6-%7B%FF%E9%1B%C3%8F%7F%90I%BC_%EC%FF%97%84%C5A%CA%08%25%21%91%AF%7F%7Eq3P%BAJ%17%5E%E2%EC%B9s%E3%E6%D3%97%C2%9F%D8%20%DD%E7%BFL%0C%EF%DE%7D%FA%07%9D.%23%A1%C2%03u%8CLHp%00%28%B8%14%D4%E0%DC%F6%FD%BBn%3E%7D%C9%FA%05%C4%DE%F7%E4%E3%B6%5B%D7%FB%BC%03%21%15%B9%87%BA%D6%99G%8F%18%BE%92%D0%F6%A4O%18%8E%82%E1%0D%18%18%18%00%00%00%00%FF%FF%22%BF%90%FD%F0%F1%EB%BD%D7%AF_%7E%F9%9Cnf%DD%F1m%17%93%04%9B%0C%3F%E8%D6%83%0F%DF%BFA%E6%FDM%15%15%20M%0C%C8%18%E2%BD7o%7E%FC%FC%FD%F5%C57Hq%2C%C0%CF-%27%28%041%EA%CB%8F%1FoQ%E7%A9%04%F8%B9%F5%A5%A5_%7E%F9%EC%A2%A2%F1%E1%FB%F7%D7O%3F%BE%BC%F9v%0F%C3%0Dx9%EB%AA%A2%F1%F5%D7/F%26%C6Gw%5EA%0C%E4%60g%83%DCZ%7B%FC%D1%FD%EF%1F%7Fbw4U%01%7Co%18%03%03%C3%9A+%17%B0%8C%D0%7D%FB%07%29b%A0%A3%81%18%0D4%AC%DB%96%90%8D%DDv%EB%AA%F0%7B6%B8%B1%7F%7F0%ECe%B8%09/d%91U%A2%81%DDwn%BC%F9%FA%95%EF%1D%13%7C%1E%8FQ%90q%F7%9D%9Bx%067%28%07%B0Y%7D%06%E6%7F%0C%CC%FF%18%19H%9F%17%82%1CXA%92%16%E4@8%F7%E2%89%E8G6h%3D%F7%87%91%F1%27%281@%0AY%3D%09%A9/%FF%7Er%91R%26%0EH%18%8E%82a%06%18%18%18%00%00%00%00%FF%FF%A2hu%C1%C7%07%9F%BB%99%F64%3A%7B5%BB%F9BD%BE%FE%FA%F9%02%5C%5C%F2%08s@%D2%E2%A5%17%CFv%5C%BE%FC%EC%D1%7B%B4%03%0Dx%85%B9%20%E3%B9%C7%1F%DD%E7%FA%C3%F2%16%DC%B9%86%CB%F2%89r+%0B%89%CC%3C%7E%E47%C3%BF%04c%8B%17/%3F%3C%BE%F7%1A%AD%9C%0D%D0%D2%13%E7%E1%DD%C2v%E5%D7%EB%9F%CC%2C%CC%CC%82%2C%15%0En%0C%0C%0C%27%1F%DE%A7%FF%8D%09%3F%FF%FE%E1%FFG%93F%0Dr%C1%CD%FC%8F%E1%E7%BF%3F%C4%E8z%F5%E533j%AB%ED%EF%CF%BFh%032%94%83%AF%BF%7EB%9Au%01Zzg%9F%3C%BA%C1%FC%8A%97%91%ED%DF%B7%BF%EC%BF%D0g%E4%E8%06%7E%23%AD6%FB%F9%97%D8a%87%01%0C%C3Q0%BC%01%03%03%03%00%00%00%FF%FF%A2%A8%90%FD%F1%F3%17%EF%9B%BF%A5%DB7%B8%A9jZ%CA%29%BE%FC%F2y%C6%C9%C3lo%FE%CB*%89zk%EABJ%D85%A7%CEb%DD%85%F5%8F%83%11%D2f9%FE%E8%FE%EB%A7%A02%91%8F%15%DA%F7%FC%C5%F0%8F%8D%99%E9%CB%AF_%8C%9F%FE%F3p%83f%8E%189%A0%5D%CE%977%DF%1Eb%B8u%19%7C%27%23d%DC@OB%EA%D8%A3%FB%E2%3C%7C%90%C3g%97%5E8%CD%84%E5t%9AQ@%7D%C0%F7%8F%0D%DE%AC%E3fc%EF%F3%09%86%1C%12t%FE%E9%93%0B%CF%9F%7C%FE%F3%87%F5%23%B1%13%FApp%E9%C5%B3%CB/%9Eb%95%C2u%9A%3B%1A%E0%90%E4%E0bC%D4vbD%CF7%8E%82Q@%0B%C0%C0%C0%00%00%00%00%FF%FF%A2t%9D%EC%EB%D7%1F9%3E%B1%9Dc%7Cx%F8%DE%1D.F%16%B67%FF%3F%7C%FC*%2C%C7%0F%29@%B7%5D%BB%82%B5%84%E5%60g%13%E6%E1%86%B0%BF%7E%FF%09Y%F7%FA%FC%13%B4%F9%29%C8%C9%F5%F5%FB%0FP%C3%8D%95%E9%FF%BF%FF%F7%DE%BD%11%E2%E6%7E%04%D3%FB%F8%E6%EB%DF%92%7FK%B6%AF%CF2%B7%85%9C%96%00%9F%26%BA%F7%EE%CD%B9%27%8F%DF%3Ez%3F%9AZ%E8%00%98%3E%FF%9Fu%FA%28%E4%9AaH%7B%16%12%17%90%E8%B8%F4%E2Y%FD%9E%AD%8C%1F%FE%C1%17%FF%12%03.%BFx%BA%EA%CC9%CC%A9%3C%D0%A1YD%14%B2%F0%F3%0DF%C1%28%18%24%80%81%81%01%00%00%00%FF%FF%A2%C2%A1%DD%3F%7E%FE%82%94%A4%F0%DE%3E7%27%3BdH%EB%ED%CBO%3A%C6%0A%7Cl%EC%D7%AE%3DA%1E.%10%93%15%80%B4%80%8E%3F%BA%FF%0B%B6a%8C%FD/3%E4%BC%18%26%16%26%86%DF%A0%AE%E8k%A6o%A2%AC%DC_%7F%FD%FC%FE%07e%9B%EC%8B%E7%EF8%DE%B1%CD%FFwLBH%C0HZ%164%DC%F6%EB%D7%F1G%F7%CF%3Dz%F4%F6%D6h%09K%27%C0%F6%87Q%E0%23%EB%D2S%A7f%9D%3E%AA*%28%E2%A8%A2%AE%27%21%05%DF%7E%A2%27%21%95ea%3B%F3%E8%11v%12obc%FB%C3%889T%FD%95%93%A8%8E%3F%F2%82%8DQ0%0A%06%03%60%60%60%00%00%00%00%FF%FF%A2%FE%CD%08%A0S%0D%C1%7D%B4%8BO%9F%F2%0Bp%5B+*%89%F3%F0%BE%FB%FE%ED%C3%05D%21%CB%C9%CB%06%C9%8D%87%1F%DC%7D%7C%0F%BAm%E0%D7%D7%3Fw%C1%85%AC4%1F%FF%85%87%1F.%BDx%A6%21%26%FE%EA%F1GnE%F6%0F%3F%7F%A0%D9%F2%E3%E7%AF%C77_%BFf%FF%F8%E2%E5%87m%AC%97A%83qx%8F%0C%1F%05%B4%00l%7F%18%D9%DE1p1%B2%BD%FC%F2a%F9%EBSK9%18%D9X%98%9B%5D%7D%20%91k%25%A7%D8%7Ft%3F%0F%1D%E7%DF%D1%16l%A0%01n%86%D1%13cG%01%BD%01%03%03%03%00%00%00%FF%FF%A2%7E%21%CB%CC%02M%CA_%7E%FE%F8%FB%F3%EF%C6%A3%17%C4d%F9e%85%04%21%EB%BA@G%7D%AB%23Fl%3F%7F%FE%06%D7%F8%E2%F9%BB%CB/%9E%B9%AAh%E8JH%DFx%F0%FC%F8%91%1B%90%FB%14%94%84D%AE%BF%7C%8E%F5%BCOPQ%7B%8F%3A%E7%CC%0Arpb%AE9%FD%C5%F2_%90%03%E7%0C%3E2%60gf%F9%CB%C4@%D2%FE%1Fvf%96%3F%2C%FF%09N%10%21%1BK%FCrz1%1E%DE%BF%DC%8C%0C%88%D0e%60fg%26f%D7%00%1F%1B%C7/%96%BF%F0p%F8%C1%FE%8F%60%080%FE%07/%9F%F8%C9%C0%F0%91%E1%0B%F7/%F8%84%FE%80lR%C0z%B4%02y%80%EC0%1C%05%A3%00%0E%18%18%18%00%00%00%00%FF%FF%A2%FE%A2%FD%0F%EF%BE@%18%92%02%02%AF%9F%7E%FC%F0%EE%8B%92%90%C8%87%EF%D0%CD%A9%02%FC%DC%BC%BC%5C%90%11%DB%AD%D7%D1%8F%E2%7E%FB%E5+%A4%A7%09%9F%E9%FA%CF%07%9A%1Fc%FCO%FD%A9j%C6%7F%8C%D7_%BE%80ss%2C%ED%BF%09%FE%FF%25%C4%F4%95%EB/%04%FD%12b%FA%C0%FF%3B%C7%D2%1E%AE%E6%FA%CB%17%CCH+p%BF%FCB%0Cb%84%E8%18%FC%10e%F8%C2%FD%17%AE%FD%3B%FF%FF_bLh%D7%9C%20kqVV%FF%C1%CF%00Q%FC%85%FB/%FCt%95%F7%DF%11%1By%BD%D4%B4%BF%0A%FF%83%9B%F9U%F8%9F%97%9A6%5C%16Y%25%1ApU%D1%10%E1%E6%06%9D%99%00s%CCO%D6%7F%C8%E7%FF%E2%02%BE%9A%3A%3F%04%A1%BA%7E%F21%FC%E0c@%0E%01d%F0%83%1D%E4%B0_%E0%C3S%E0%E8%1F+%29q@%0D%80%19%5C%DF8%FE%21%3B%E9%1B%078%00%85%FE%A3%9D%E0C%10%90%1D%86%A3%60%14%C0%01%03%03%03%00%00%00%FF%FF%A2%7EK%F6%C7%CF_W%9E%3Fc0%00%CD%87%DC%7C%FDR%9E_POB%EA%F4%A3%87%10Y%3Ei%9Ex%23s%C8F%9A%8F/%BE%A1k%FE%F2%0FrV%B7%AE%94%F4%AB%BB%EF98X%B999@%CB%C2%BE%7C%A2%BA%3B%D9%7F1%5D%7D%F5%02%BE%08%C9RNqf%60%04%9E%A3%0E%BF%FE%FAy%F5%D5%0B%9E%DF%D0%D2%9F%F5%17%D3%C9%87%F7%E1%27%91G%1B%98Z%CA%29%A2%ED%F8z%F9%E5%F3%C5%DB%8F%19%BEA%17%5D%B1%FCa%3C%FD%F8%01%5CK%8E%A5%9D%97%BA%16D%CB%D1%87%F7%DE%3D%F9%04%3Aa%EB%17%D3%B1%87%F7%E0+as%2C%ED%8C%A5e%B1%EE%F8b%60%608%F6%F0%1E+%8Ei%A5%7B%EF%DE4%BB%F9%5Ez%F1%F4%15%F8%88%09%B4%DDJ%F7%DE%BD%E1%86%1D%16%81V%D9D%1B%98%BA%A8h%C0%C3%C1EE%E3%E5%97%CF%F0PB%06%9Fx%FE%B8%28%AB%DF%7B%FB%06YPN@%08y%1B%18I1B%06%C0%0C.uQ%B1%F3O%9F%3C%FA%80%188%82%9C%B0%B3%ED%E6%D5%7F%9F%88Z%FDFF%18%8E%82Q%80%0B000%00%00%00%00%FF%FF%A2%C9m%B5%DF%9F%7D%9Fz%FCP%B6%A5%5D%9Fw%10%03%03C%FD%9Emo%EF%7E%804c%D5%25%C4%C5yx_%7E%F9%7C%E9%E1%13%CC%21%D4%A7%8F%DEl%E7%FC%EB%AA%A2a%A7%A4r%E7%ED%AB%A7_%3E%A6%9BY%1F%7Bt%9F%F7%1F%DB%07j%3B%92%F9%1F%03%CBo%C6%A9%C7%0F%C3%0F%ED%16%E7%E1%C5%B3%CE%7C%EA%F1%C3%2C%BF%11%87%C9%B2%FDa%FC%F0%E3%3B%FC%FA%06H%26%84O%FB@%C0%F1G%F7%CF%3Cx%08%CF%88%EC%BF%98%5E%7F%FD%8A%7C%95%19%B2%96%0D%CF%CFC%8C%FD%F4%FB%F7%86k%97%E0.%81%1C%19%8E%E9%9E%0D%D7.%FD%F8%FD%9B%EF%0F%F6Bv%E2%91%FD%D2%FC%82%B8%CE%23%DFv%F3%1A%D3%8F%FF%0C%0C%8C%10W%5DA%AAl%D0%C2%E1%E5%97%CF%15%3B7v%B8%FBc%DD%23%00YH%87%0B%EC%B9s%83%8F6k%87%E1%00%12%5C%C8%B1%00_%DE%80%06%8E%3F%BC%FF%8E%81%B4%AA%9A%F80%1C%05%A3%00%17%60%60%60%00%00%00%00%FF%FF%A2%C9%1E%FF%0F%1F%BF%3E%B8%F3%AAa%D7%D6-%97/7%EC%DA%FA%ED%F97%C8%22-v%09%E8%0E%85i%27%0E%3F%BB%F7V%80%9F%5BBR%08M/%DB%27%C6%A5%17N%8B%F3%F0V%3A%BAO%F1%0D%13%E7%E1%5D%7F%F5%22d%21-%D5%01%D7G%C6S%0F%1E%E4oZ%7D%E9%C53%3Cf_z%F1%2C%7F%D3%EAS%0F%1Ep%7DD%C9Q%5C%EF%19%A7%1C%3B%04%DF%DB%8E%09%EE%BD%7B%C3%FC%1BE%94%F33c%FD%9E%AD%F8%AD%E3z%CF8%FF%CC%89%F9gN%E02%F6%EB%AF%9F%10%05%5C%EFq%E6pNV%B6%03%0Fno%B8v%09Sj%C3%B5K%BBo%DF%60%FB%0C%D5%CB%FC%8F%81%F3%27S%E1%96%B5%98%0D%CF%97_%3E%D7%EE%DA%CC%CC%C0%04oJ%13%0F%20%E7%84%B1%7C%A6%F9%11*%90X%98%7F%E6%04%D5%1B%CE%C4%87%E1%28%18%05%B8%00%03%03%03%00%00%00%FF%FFb%DCt%F3%0A%84%B5%FC2%F4%DE%A4%BD%F7o%D1%28%C4t%8C%15J%EC%9D_%7E%F9%3C%E5%E0%7E%86%DF%0C2R%C2z%12R%9B%AE%5Ez%7F%EF%13%F2%5D%06%B2%EA%A2%C6%8A%0AJB%22%E2%3C%BC%D3N%1C%FE%F6%FC%1BMwp%7D%E3%F8%F7%97%8F%F1%1F%C3%7Fi%5E%943a%21%CD%9F%A7%9F%3F2102%7F%FA%CF%F5%03K%85%049O%F6+%23%E8%10R%5DIi%1E%D82%F8%CB%CF%9F%BD%F9%F6%E5%D9%97O%3C_Y%D04%FEd%FB%F7%8D%EF%BF0%27%97%91%8C%1CdK%E8%FB%EF%DF%F7%DE%BD%C9%F1%81%01%F9%3CY%C8%01%A9R%3C%7CJ%82%22%90%03R%21%87%99%DE%7B%FF%E6%D9%97O%BC%7FX%D9%3E%A3%DF%D1%F0J%F8%17%F2EXkN%9Fc%E4%60%E2%60e5%80%9D%85%FA%F4%E3%C7s%CF%1E%FF%FB%F3%9F%ED%FD%3F%B4%09%B7%9F%7C%0C%1FY%7F%A9%0A%8A@%CE%84e%60%608%F5%E8%C1%ED%F7o%F8%7F%B3%FD%F9%F3%97M%90%0Dr%AA%E4%FB%1F%DF%7E%BD%FF%05Yb%F5A%E4%AF%10%27%17%17%1B%1B%B2%C7%A1%81%F6%E9%23%CB_F%22Oq%7D%25%FC%0B%D7y%B5D%AAA%0E.%11.%1E%5DID%A3%FB%F8C%D0h%CC%D3O%1F%7F%FE%FB%23%F4%91%15%EE%1E%5C%06R%12%86%A3%60D%01gE%C4%A1%19p%10%A9k%88%26%C2%C0%C0%00%00%00%00%FF%FF%EC%5D%CD%8A%C20%10%CELb%AD%28%EEA%7C%10O%BE%CD%BE%A0%17%1F%C0%8Bg%11%F7%A8%2CJU%DC%C5%9FHS%A1%8D%DD%A4Hh%AD%F5%97%8A%EC%CD%EF%18%12%C2%0Cd%98%99%24%DF%F7/%ED%82%7B%F0u%92%D7%FDyZ%FA%FB%05%C27_%7D6%9A%AD%E8LWf%3EZK/%ECW%1D%F3%D9%C1%11y%B4d%5E%81%09%82%92h%04%EE%8A%B8fO%C1%14T%12j%FD%DB%C7%C9p%EFo%89%8D%16%DF%89%CE%EF%A9%A5A5%A0%86k%82%DA%B8%3C/n%88d%B2%CB%87%E9%60%29%C4B%E6J%CDd%97%02l%B0%7C%11%7C-g%03L%3A%DA%B12B%5D%5By%14%07%98%86%F2%1AC%A6z%EE%A4w%5C%7Ed%F5%BF4%A7%E8%91%3AX%AB%9D%DB%FE%19%A4%A6%D5%94%A1M%60H%F5R%A5%B5%B6%1D%25%D1%ED%83SIe%80A%D6%F0s%A7%E5B9%A0Ya%C4%9B%5D%E6%C7sbw%95%88q%97C%FD%F1%F4%F4%14%85%29%80%08*%11%5E%7Cz%CE%B3%E9%B3%3E%7C%E3%8Dk%10B%0E%00%00%00%FF%FF%A2k%21%0B9%3BF%9C%87%97Y%90%E5%C3%F3w%1F%3E%7E%D5%D2%96%C5z%D0%EA%EB%E7%1F%19%9Ec3%82f%00t%A6%C9/%26v%B2%CAs2%F4%82V%98%12%BA%E8%9F%F1%3FD%19E%99%99%18%8B%E0%D6%B1c%F3%05%F4%B4%17%1C%CEc%60%60%24/%D0%E0%80%98%CB%BD%89%BC%00%1C%E4%1E%E2%82%8B%A4%1B%C5%89%0F%C3Q0%0A%D0%00%03%03%03%00%00%00%FF%FF%A2k%21%CB%CD%C0%02%D9%D3%E5%A0%A2z%98%81%F1%E7%DF%3Fb%22%7C%C4%9Ff%3D%0AF%C1%28%18%05C%0B000%00%00%00%00%FF%FF%A2k%21%FB%FA%C1%C7%A5%EC%A7%8B%EC%9C%90%A7%80%17%9C%3D%F1%E3%1Dm%07%04F%C1%28%18%05%A3%60@%00%03%03%03%C17%13%2C%00%00%00%EBIDAT@t-d%7F%FC%FC%F5%F4%E6%9B%8E%9F%3B%19X%195%C4%24%7E%FF%FD%FB%F8%DD%FBO/%BE%D2%FFd%C2Q0%0AF%C1%28%A0%03%60%60%60%00%00%00%00%FF%FF%A2k%21%0B%3Fs%004%BB%C5%80%E5t%AEQ0%0AF%C1%28%18N%80%81%81%01%00%00%00%FF%FF%A2w%21%3B%0Ah%0A%BC%16N%87%1B%3Fz%1E%0Ay%604%0CG%01%15%01%03%03%03%00%00%00%FF%FF%1A-d%87%0F%10%7B%3B%BA%CB%93R0%1A%86%A3%80%BA%80%81%81%01%00%00%00%FF%FF%A2%F9%AD%AE%A3%60%14%8C%82Q0b%01%03%03%03%00%00%00%FF%FF%1A-dG%C1%28%18%05%A3%80V%80%81%81%01%00%00%00%FF%FF%C22%5C%80u%BB%D8%28%18%05%A3%60%14%8C%02R%01%03%03%03%00%00%00%FF%FFB%9C%5D0%0AF%C1%28%18%05%A3%80%BA%80%81%81%01%00%00%00%FF%FF%03%00%99%E5v%20%1B%0B%90%DE%00%00%00%00IEND%AEB%60%82") );

    var help = _fr.add(
      'iconbutton', 
      undefined, 
      unescape("%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%19%08%06%00%00%00++%EE%5D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD%7E%FC%00%00%02-IDATH%89c%FC%FF%FF%3F%03-%01%13MM%A7%87%05%2C%84%140%CE%AF0%60%60%60%00a%05%24%E1%0B%0C%0C%0C%07%FE%27v%7C%20%A8%1FW%1C0%CE%AF%28%E0%60a%AD%FA%FB%FF%1F%AF%B1%94%1C%87%B2%900%5C%EE%F4%D3G%9Fo%BDy%C5%CB%C6%CC%B2%FC%D7%DF%3FY%F8%2C%C2i%81%C0%F2%C6%8B%E1%BAFzz%12R%0C%97%5E%3Cc%F8%FA%EB%27X%DCRN%91AIH%84%E1%E5%97%CF%0C%D3O%1E%FE%7D%E9%C5%B3%FB%3F%FE%FC6%C7e%09%5E%0B%7E%FC%F9%AD%C9%C2%C4%F4%E5%EB%AF_%87%A0%C1%22%C0%C2%C4%94%1A%AEk%C4%15m%60%0AVW%BB%7B%CB%D7%B3%CF%1E%F7%FCO%ECh%C0f%0E%CE8%F8%F8%E3%FBz%06%06%86%FC%1F%89%1D%07P%5C4%BFb%C2%EA+%E7oD%1B%98%B2%83%F8%5E%EA%DA%DCw%DE%BD%09d%60%60%20%CD%02%5C.%FA%9F%D8%F1%80q%7E%05%3B%B2%D8%9F%7F%FF%FE%E02%87%E4d%CA8%BF%22@%80%83%F3%1B%8C%BF%E6%CA%F9%1F_%7F%FD%DCL%15%0B%18%E7W%08%B01%B3%CCH4%B6%E0%02%F1w%DF%B9%C1p%FB%ED%EB%7F%0C%0C%0C%13%A8b%01%1B3%CB4e%21a%7EW%15%0D%B0%E1%93%8F%1F%FC%FE%E7%DF%3Fk%7C%C9%94h%0B@%91+%C6%C3%13%D0%E4%E2%CDq%FC%D1%7D%98%E1V%FF%13%3B.%E0%D5GLa%C78%BF%C2%81%8D%99e%E7%CC%80%086P%7E%28%DC%B6%EE%C7%EF%BF%7F%23%FF%27vl%20%A4%97%28%1Fp%B3%B1%CD%CD%B6%B0e%13%E7%E1e8%F2%F0%1E%C8%F0%99%C4%18N%94%05%8C%F3+%14%7E%FF%FD+%0D%0Aw%10%B8%FA%F2%F9gP9D%8C%E1%0C%C4%14v%A0B%8E%9B%8D%FD%FF%D2%0B%A7%C1%9C%27%9F%3E%F0200%10%2C%E4H%B1%E0%C1%FB%EF%DF%3A%97%5E%3C%83%22F%AC%05%03_%1F%80%82H%90%93%AB%DCKM%8B%03%C4%D9v%EB%DA%8F%F7%DF%BF%1D%20%D6%17%C4X%C0%20%C4%C9%F5%3D%DA%C0%14l%C1%89%C7%0F%BE%BF%FF%FE%8D%B0%26R%2Cx%F7%FD%1B%27%2C%92Al%A2M%A7G%24%0F%F1f%0B%03%03%03%00T%A5%F5%85%11%F3X%B2%00%00%00%00IEND%AEB%60%82"), 
      {style: "toolbutton"} 
    )
    help.onClick = function() { openWebsite( "https://www.project-octopus.net/script-help" ) };
  }

  var saved_questions = read_questions();

  // ----------------------------------------------------------------------------------------------------------------------
  //  Die Controls
  // ----------------------------------------------------------------------------------------------------------------------
  w.main.add("statictext", undefined, __('ui_saved_questions'))
  w.saved_dd = w.main.add('dropdownlist', [undefined, undefined, width, 20], saved_questions)

  w.main.add('statictext', undefined, __('q'), );
  w.q = w.main.add('edittext', [undefined, undefined, width, 60], "", {multiline:true});

  w.g1 = w.main.add("group {orientation: 'row', alignChildren: ['right', 'top']}")

  w.ok_btn = w.g1.add('button', undefined, __("ui_ok"))
  w.ok_btn.enabled = false;

  w.main.add('statictext', undefined, __('a'), );
  w.a = w.main.add('edittext', [undefined, undefined, width, width/2], "", {multiline:true});

  w.cancelElement = w.btns.add('button', undefined, __('ui_cancel'))
  w.cancelElement.onClick = function() {
    this.window.close();
  }

  w.wait_msg = w.main.add("statictext", undefined, __("wait_msg"), {multiline: true})
  w.wait_msg.visible = false;

  w.footer.add('statictext', undefined, 'v' + version)

  // ----------------------------------------------------------------------------------------------------------------------
  //  Die Interaction
  // ----------------------------------------------------------------------------------------------------------------------
  w.saved_dd.onChange = function() {
    w.q.text = this.selection.text;
    w.q.notify("onChange");
    var a = get_answer( this.selection.index );
    w.a.text = a;
  }
  w.q.onChanging = w.q.onChange = function() {
    if ( /* w.q.text.toLowerCase().search(/indesign/) == -1 || */ w.q.text.length < 20 && ! w.ok_btn.enabled ) {
      w.ok_btn.enabled = false;
      // w.hint.visible = true;
    } else {
      w.ok_btn.enabled = true;
      w.a.text = __('wait');
      // w.hint.visible = false;
    }
  }

  w.ok_btn.onClick = function() {
    w.ok_btn.enabled = false;

    var _aux3 = JSON.stringify( {'q': "In Indesign: " + w.q.text, 'w': 'octopus', 't': 'help'} );
    var request = {
      url: "https://octopus.cuppascript.de/api/v1/scripts/openai",
      command: "", // defaults to ""
      port: "", // defaults to ""
      method: "POST",
      body: _aux3,
      headers: [{name:"Content-Type", value:"application/json"}]
      // headers: [{name:"Content-type", value:"application/json; charset=UTF-8"}]
    }
    var response = restix.fetch(request);
    if (response.error) {
      var a = response.httpStatus + ": " + response.errorMsg;
    } else if ( response.httpStatus != 200 ) {
      var a = "Error: API replied with Status " + response.httpStatus;
    } else {
      write_question( w.q.text );
      var a = JSON.parse( response.body );
      a = a.join("\n\n");
      write_answer( a );
    }
    w.a.text = a;
    w.ok_btn.enabled = true;
  }

  w.show();

  function write_question( txt ) {
    var base = get_config_path();
    var f = new File( base + "/qa.json");
    if ( f.exists ) {
      var qa = JSON.parse( read_file( f ) );
    } else {
      var qa = [];
    }
    var now = new Date().getTime();
    qa.push( {question: txt, answer: "", ts: now } );
    var f1 = new File( base + "/qa.json");
    f1.encoding = "UTF-8";
    f1.open("w");
    f1.write(JSON.stringify(qa, undefined, 2));
    f1.close();
  }
  function write_answer( txt ) {
    var base = get_config_path();
    var f = new File( base + "/qa.json");
    if ( f.exists ) {
      var qa = JSON.parse( read_file( f ) );
    } else {
      return;
    }
    if ( qa[ qa.length-1 ].answer == "" ) {
      qa[ qa.length-1 ].answer = txt;
      var f1 = new File( base + "/qa.json");
      f1.encoding = "UTF-8";
      f1.open("w");
      f1.write(JSON.stringify(qa, undefined, 2));
      f1.close();
    }
  }
  function write_question_alt( txt ) {
    var sep = File.fs == "Macintosh" ? "/" : "\\";
    var that = Folder.userData.fsName.split(sep)[2]
    var ud_path = ensure_path_exists( "cs_octopus", Folder.userData.fullName );
    var f = new File( ud_path + "/qa.txt" );
    f.encoding = "UTF-8";
    f.open("a");
    f.writeln( w.q.text );
    f.writeln( "--- stop ---")
    f.close();
  }
}

function read_questions() {
  var base = get_config_path();
  var f = new File( base + "/qa.json");
  if ( ! f.exists ) return [];
  var qa = read_file( f );
  qa = JSON.parse(qa);
  var rs = [];
  for ( var n = 0; n < qa.length; n++ ) rs.push( qa[n].question );
  return rs;
}
function read_questions_alt() {
  var ud_path = Folder.userData.fullName + "/cs_octopus";
  var f = new File( ud_path + "/qa.txt" );
  f.encoding = "UTF-8";
  f.open("r");
  var raw = f.read( );
  f.close();
  var rs = raw.split("\n--- stop ---\n");
  rs.pop();
  return rs;
}
function get_answer(nth) {
  var base = get_config_path();
  var f = new File( base + "/qa.json");
  if ( ! f.exists ) return "n/a";
  var qa = read_file( f );
  qa = JSON.parse(qa);
  try {
    var a = qa[ nth ].answer;
    return a;
  } catch(e) {
    return "Error: " + e;
  }
}








function __( id ) {
  if ( typeof loc_strings == "undefined" ) loc_strings = load_translation();
  if (loc_strings.hasOwnProperty(id)) {
    return localize(loc_strings[id]);
  } else {
    return id
  }
}
function load_translation() {
  return {
    "ui_ok": {
      "de": "Frage senden",
      "en": "Send Question"
    },
    "ui_cancel": {
      "de": "Schließen",
      "en": "Close"
    },
    "q": {
      "de": "Ihre Frage",
      "en": "Your Question"
    },
    "a": {
      "de": "Die Antwort",
      "en": "The Answer"
    },
    "id-needed": {
      "de": "Das Wort 'InDesign' muss in der Frage auftauchen",
      "en": "The word 'InDesign' has to be part of the question"
    },
    "wait": {
      "de": "Die Anfrage wird über einen einfachen Account gestellt. Das kann je nach Auslastungen zwischen 5 und 60sec dauern.",
      "en": "The request is made with a low-prio account. This can take between 5 and 60 seconds"
    },

    "wait_msg": {
      "de": "Unsere OpenAI Schnittstelle ist nicht die allerschnellste. Anfragen können eine Minute oder mehr dauern",
      "en": "Our OpenAI API can take quite some time to generate a text"
    },
    
    "ui_saved_questions": {
      "de": "Gespeicherte Fragen",
      "en": "Saved Questions"
    },
    "q1": {
      "de": "In InDesign, wo stellt man ein, dass Verknüpfungen beim Öffnen des Dokuments nicht aktualisiert werden?",
      "en": "In InDesign, how do you configure that links are not checked when opening a document?"
    },
    "q2": {
      "de": "In InDesign, wie richtet man den Goldenen Schnitt als Satzspiegel ein?",
      "en": "How do you create a layout following the golden ratio?"
    },
    "q3": {
      "de": "Kann man aus einem InDesign-Dokument ein fertig ausgeschossenes PDF erzeugen?",
      "en": "Can you create a ready imposed PDF from an InDesign document?"
    },
  }
}








