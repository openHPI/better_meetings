module.exports = {
  // Load Mock Product Data Into localStorage
  init: function() {
    localStorage.clear();
    localStorage.setItem('product', JSON.stringify(
      {
        agendaItems: [ 
          {
            title: 'Start',
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando'
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando'
              },
              {
                id: '2',
                title: 'Task3',
                author: 'Lando'
              },
              {
                id: '3',
                title: 'Task4',
                author: 'Lando'
              }
            ],
            todoList_done: []
          },
          {
            title: 'Mitte',
            description: "1,2,3 Polizei",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando'
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando'
              }
            ],
            todoList_done: []
          },
          {
            title: 'Ende',
            description: "...",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando'
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando'
              }
            ],
            todoList_done: []
          }
        ]
      },
      {
        member: [
          {
            id: '0',
            name: 'Lando',
            surname: 'Löper',
            eMail: 'lando.loeper@student.hpi.de'
          },
          {
            id: '1',
            name: 'Hans',
            surname: 'Peter',
            eMail: 'hans.peter@student.hpi.de'
          },
          {
            id: '2',
            name: 'Matthias',
            surname: 'Radscheit',
            eMail: 'matthias.radscheitr@student.hpi.de'
          },{
            id: '3',
            name: 'Max',
            surname: 'Mustermann',
            eMail: 'max.mustermann@student.hpi.de'
          }
        ]
      }
    ));
  }

};