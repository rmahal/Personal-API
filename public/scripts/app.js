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

    // console.log(char._id)
    // console.log(char.bestMoves)
    let charHtml = `
    <ul style="margin-top: 25px;"> ${char.name}
    <li>Playstyle: ${char.playstyle}</li>
    <li>Best Moves: ${char.bestMove}</li>
    <li>Combos: ${char.combo}</li>
    </ul>
    <button class="deleteChar" data-id="${char._id}">
    DELETE
    </button>
      `
      // <a style="margin-left:35px;" href="javascript:void(0)" data-toggle="collapse" data-target="#update-${char._id}">
      // UPDATE
      // </a>
      //  <a href="javascript:void(0)"  data-id="#delete-${char._id}">
      //   DELETE</span>
      // </a>


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

  $('#charList').on('click', '.deleteChar',event => {

    event.preventDefault();

    var charId = $(event.currentTarget).attr('data-id');
    console.log("ID: "+charId);

    var charToDelete = allChars.find( char => char._id == charId );
    console.log("Char to delete: "+charToDelete.name);

  // // DELETE request to delete todo
    $.ajax({
      type: 'DELETE',
      url:  '/api/characters/' + charId,
      success: json => {
        console.log(allChars.indexOf(charToDelete));
        allChars.splice(allChars.indexOf(charToDelete), 1);
        renderAll();
      }
    });

  });







});