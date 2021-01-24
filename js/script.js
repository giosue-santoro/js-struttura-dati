// Campo field delle carte
const fieldCodes = [
  'W', 'U', 'B', 'R', 'G'
]

// Tipo della carta
const cardTypes = [
  'terre',
  'creature',
  'incantesimi',
  'artefatti',
  'instantanei',
  'stregonerie'
]

// PowerValues - valori consentiti
const powerValues = [1,2,3,4,5];

// Abbiamo creato un oggetto di oggetti, come riferimento
// di una edizione. Se ad esempio scrivo editions['SP']
// allora otterrò tutto un oggetto che descrive
// con più dettagli l'edizione.
// come oggetto di oggetti, può essere navigato solo con il for-in
const editions = {

  'BL': {
      edition: 'Boolean',
      rarity: 'blue'
  },

  'SP': {
      edition: 'Special',
      rarity: 'red'
  }

}

// CREAZIONE DELLE CARTE DI GIOCO
const cards = [{
  // carta 1
  cardName: 'Grizzly Bears',

  cost: {
    genericCostNumber: 1,
    costFields: [ 
      fieldCodes[0],  
      fieldCodes[2]   
    ],
  },

  picture: 'images/i.png',
  cardType: cardTypes[1],
  cardObject: 'Bear',

  editionType: editions['BL'],

  description: 'Lorem ipsum',
  story: 'Naltro Lorem Ipsum',

  score: {
    power: 2,  // filtrarlo per power
    toughness: 2
  }

  },
  // carta 2
  {

    cardName: 'Sviluppatore guerriero',

    cost: {
      genericCostNumber: 3,
      costFields: [ 
        fieldCodes[2],
        fieldCodes[3]
      ],
    },

    picture: 'images/g.png',  // da inserire immagine
    cardType: cardTypes[1],
    cardObject: 'Bear',

    editionType: editions['BL'],

    description: 'Lo sviluppatore guerriero spezza i byte in bit!',
    story: 'Lo sviluppatore guerriero è una forma di essere umano evoluto.',

    score: {
      power: 5,  
      toughness: 3
    }

    },
  // carta 3
  {

    cardName: 'Onix',

    cost: {
      genericCostNumber: 3,
      costFields: [ 
        fieldCodes[2],
        fieldCodes[3]
      ],
    },

    picture: 'images/g.png',  // da inserire immagine
    cardType: cardTypes[0],
    cardObject: 'Pokemon',

    editionType: editions['BL'],

      description: 'Si muove alla velocità di 80 km/h',
    story: 'Si muove sotto terra provocando scosse e boati',

    score: {
      power: 5,  // r
      toughness: 3
    }

    },
    // carta 4
    {

      cardName: 'Entei',

      cost: {
        genericCostNumber: 2,
        costFields: [ 
          fieldCodes[0],
          fieldCodes[2]
        ],
      },

      picture: 'images/g.png',  // da inserire immagine
      cardType: cardTypes[1],
      cardObject: 'Pokemon',

      editionType: editions['SP'],

      description: 'Infligge 20 danni in più per ogni pokemon nella panchina del tuo avversario',
      story: 'Si dice che quando emette il suo verso, un vulcano nel mondo stia eruttando.',

      score: {
        power: 4,  // r
        toughness: 2
      }

      },
      // carta 5
      {
      cardName: 'Paralyze',

      cost: {
        genericCostNumber: '',
        costFields: [ // colors array con riferimento a fieldCodes
          fieldCodes[2],  
        ],
      },

      picture: 'images/i.png',
      cardType: cardTypes[2],
      cardObject: 'Enchant',
      editionType: editions['SP'],
      description:'When paralyze ecc..',
      story:'',
      authorString:'autore copyright autore',
      cardColor: fieldCodes[2],
      score: {
        power: 0,  // filtrarlo per power
        toughness: 0
        }
      },
      // carta 6
      {

      cardName: 'Dancing Scimitar',

      cost: {
        genericCostNumber: 4,
        costFields: [],
      },

      picture: 'images/g.png',  // da inserire immagine
      cardType: cardTypes[3],
      cardObject: 'Spirit',

      editionType: editions['BL'],

      description: 'Vola (questa creautare non può essere fermata eccetto da una creatura volante )',
      story: 'Una spada che non ha mai conosciuto il fodero, un\'impugnatura che non ha mai conosciuto mano',

      score: {
        power: 1,
        toughness: 5
      }

    }


]

// CREAZIONE DELLE CARTE DI GIOCO

// FUNZIONI DATI
function filterByPower(powerValue,array){
  return array.filter((element)=>{
    return element.score.power === powerValue;
  });
}

function filterByCardType(cardType,array){
  return array.filter((element)=>{
    return element.cardType === cardType;
  });
}

// FUNZIONI DATI

// FUNZIONI RENDERING

// Mostra carte in elemento HTML generico
function render(DOMElement, array){
  const cardListHTMLElement = document.getElementById(DOMElement);


  // Per svuotare elemento
  cardListHTMLElement.innerHTML = '';

  array.forEach( (element) => {
    let {cardName,cardType,score} = element;
    cardListHTMLElement.innerHTML += `
    <li> ${cardName} - ${cardType} - ${score.power} / ${score.toughness}
    </li>
    `
  });
}

// select HTML generica
function renderSelect(DOMElement, array){
  const select = document.getElementById(DOMElement);
  array.forEach( (element) => {
    select.innerHTML += ` <option value=${element}> ${element} </option> `;
  });
}

// FUNZIONI RENDERING



// filterByPower(5,cards);
render('lista-carte',cards);
renderSelect('power-select', powerValues);
renderSelect('card-select', cardTypes);


// Evento change del selettore potenza
$('#power-select').change(function(){
  // Controllo selezione
  if(isNaN($(this).val())){
    alert('errore');
  }else{
    const selectValue = parseInt($(this).val());
    const filteredArray = filterByPower(selectValue, cards);

    render('lista-carte', filteredArray);
  }
});


// Evento change del selettore tipo carta
$('#card-select').change(function(){
  const selectValue = $(this).val();
  console.log(selectValue);
  const filteredArray = filterByCardType(selectValue, cards);

  render('lista-carte', filteredArray);

});