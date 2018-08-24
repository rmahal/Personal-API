console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code

  const baseUrl = '/api/characters';
  let allChars = [];
  const $charList = $('#charList');
  const $createChar = $('#forCharCreate');

  const renderAll = () => {
    $charList.empty();
    allChars.forEach( char => render(char) );
  }

  render = char => {

    console.log(char._id)
    console.log(char.bestMoves)
    let charHtml = `
    <ul style="margin-top: 20px;"> ${char.name}
    <li>Playstyle: ${char.playstyle}</li>
    <li>Best Moves: ${char.bestMove}</li>
    <li>Combos: ${char.combo}</li>
    </ul>
    <button id="update" style="margin-left: 25px">Update</button>
    <button id="delete">Delete</button>
      `
    $charList.append(charHtml);
  };


  $.ajax({
    method: "GET",
    url: baseUrl,
    success: json => {
      allChars = json.data
      renderAll()
    }
  });


  $('#forCharCreate').on('submit', event => {
    event.preventDefault();

    // serialze form data
    let newChar = {
      name: $("#name").val(),
      playstyle: $("#playstyle").val(),
      bestMove: $("#bestmove").val(),
      combo: $("#combo").val()
    }
      console.log("newchar info: " + newChar);

    $.ajax({
      method: "POST",
      url: '/api/characters',
      data: newChar,
      success: json => {
        console.log(json);
        allChars.push(json);
        // render one todo to view
        render(json);
      }
    });
    // reset the form
    // $createChar[0].reset();
    // $createChar.find('input').first().focus();
  });

  // $.ajax({
  //   method: "PUT",
  //   url: baseUrl,
  //   success: json => {
  //     allChars = json.data
  //     renderAll()
  //   }
  // });


  // $.ajax({
  //   method: "DELETE",
  //   url: baseUrl,
  //   success: json => {
  //     allChars = json.data
  //     renderAll()
  //   }
  // });


});
