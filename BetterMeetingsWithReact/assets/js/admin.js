jQuery(document).ready(function () {
  /* Meetingseries Description */

  jQuery('.meetingseries-information-descritpion').editable('/meetingseries/updateDescription', {
    name: 'description',
    indicator: 'Saving...',
    tooltip: 'Click to edit...'
  });

  jQuery('.meetingseries-information-timer').editable('/meetingseries/updateTimer', {
    name: 'timer',
    indicator: 'Saving...',
    tooltip: 'Click to edit...'
  });

  /* Meetingseries General */

  jQuery('#addAdmin-button, addMember-button').click(function () {
    jQuery('#createPersonModal').modal('show');
  });

  jQuery('#createPersonModal').on('show.bs.modal', function (event) {
    var button = jQuery(event.relatedTarget); // Button that triggered the modal
    var person = button.data('person'); // Extract info from data-* attributes
    var modal = jQuery(this);

    console.log('test');

    modal.find('.modal-title').text('Create new ' + person);
    modal.find('#person-type').text(person);
  });

  /* Topics */

  jQuery('#create-subitem-button').click(function () {
    var text = jQuery('#create-subitem-input').val();
    jQuery('#create-subitem-input').val('');
    var count = jQuery('.subitem-container').attr('data-count');
    jQuery('.subitem-container').attr('data-count', parseInt(count) + 1);
    jQuery('.subitem-container').append('<input type="text" class="form-control" name="subagendaitem' + count + '" value="' + text + '"/>');
  });

  /* Meetings */

  jQuery('.download-summary-button').click(function () {
    var meetingId = jQuery(this).attr('data-id');
    jQuery.get('/meeting/summary/' + meetingId);
  });

  /* Meeting Modal */

  // jQuery(function () {
  //   jQuery('#selected-topics, #all-topics').sortable({
  //     connectWith: '.topics-list'
  //   }).disableSelection();
  // });

  jQuery('.start-meeting-button').click(function () {
    var meetingId = jQuery(this).attr('data-id');
    jQuery.get('/meeting/start/' + meetingId);
  });

  jQuery('#deleteTopicModal').on('show.bs.modal', function (event) {
    var button = jQuery(event.relatedTarget); // Button that triggered the modal
    var topicId = button.data('id'); // Extract info from data-* attributes
    var topicTitle = button.data('title'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods
    // instead.
    var modal = jQuery(this);

    console.log('open delete modal');
    console.log(event);

    modal.find('#id').val(topicId);
    modal.find('#title').val(topicTitle);
  })

  Sortable.create(document.getElementById('dragListTopics'), {
    handle: '.fa fa-arrows-v',
    animation: 150,
    onAdd: function (evt) {
      console.log('add:', evt.item);
    },
    // onUpdate: function (evt) { console.log('update:', evt.item); },
    onRemove: function (evt) {
      console.log('remove:', evt.item);
    },
    onStart: function (evt) {
      console.log('onStart.foo:', evt);
    },
    onEnd: function (evt) {
      var list = evt.to;
      var id = jQuery(list).data('id');
      var order;
      var child;

      for (child in list.children) {
        if (list.children.hasOwnProperty(child)) {
          if (!order) {
            order = jQuery(list.children[child]).data('id');
          } else {
            order += '_' + jQuery(list.children[child]).data('id');
          }
        }
      }

      jQuery.post('/meetingseries/updateTopicOrder', { id: id, order: order }, function () {
        console.log('success');
      }).done(function () {
        console.log('second success');
      }).fail(function () {
        console.log('error');
      }).always(function () {
        console.log('finished');
      });
    }
  });

  Sortable.create(document.getElementById('dragListMeetingCreation'), {
    handle: '.fa fa-arrows-v',
    animation: 150
  });
});
