module.exports = {
  // Load Mock Product Data Into localStorage
  init: function() {
    localStorage.clear();
    localStorage.setItem('product', JSON.stringify(
      {
        agendaItems: [ 
          {
            id: '0',
            title: 'Start',
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '2',
                title: 'Task3',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '3',
                title: 'Task4',
                author: 'Lando',
                assignee: null,
                done: false
              }
            ],
            done: false
          },
          {
            id: '1',
            title: 'Mitte',
            description: "1,2,3 Polizei",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando',
                assignee: null,
                done: false
              }
            ],
            done: false
          },
          {
            id: '2',
            title: 'Ende',
            description: "...",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando',
                assignee: null,
                done: false
              }
            ],
            done: false
          },
          {
            id: '3',
            title: 'Präsentation',
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '2',
                title: 'Task3',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '3',
                title: 'Task4',
                author: 'Lando',
                assignee: null,
                done: false
              }
            ],
            done: false
          },
          {
            id: '4',
            title: 'Klausur',
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '2',
                title: 'Task3',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '3',
                title: 'Task4',
                author: 'Lando',
                assignee: null,
                done: false
              }
            ],
            done: false
          },
          {
            id: '5',
            title: 'PEM',
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '2',
                title: 'Task3',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '3',
                title: 'Task4',
                author: 'Lando',
                assignee: null,
                done: false
              }
            ],
            done: false
          },
          {
            id: '6',
            title: 'Urlaub',
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
            todoList: [
              {
                id: '0',
                title: 'Task1',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '1',
                title: 'Task2',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '2',
                title: 'Task3',
                author: 'Lando',
                assignee: null,
                done: false
              },
              {
                id: '3',
                title: 'Task4',
                author: 'Lando',
                assignee: null,
                done: false
              }
            ],
            done: false
          }
        ],
        
        member: [
          {
            id: '0',
            name: 'Lando',
            eMail: 'lando.loeper@student.hpi.de'
          }
        ],
        timer: 360
      }
    ));
  }

};