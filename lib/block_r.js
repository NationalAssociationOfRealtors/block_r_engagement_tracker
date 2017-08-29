
/**
 * Block R transaction processor function.
 * @param {org.block_r.engagement_tracker.ReportedEvent} ev The reported event instance.
 * @transaction
 */
function reportEvent(ev) {

 return query('selectUser', { userId: ev.reportedBy} )
   .then(function (users) {
     var aUser = users[0];
   
         return query('selectEventType', { eventTypeId: ev.eventType} )
           .then(function (eventTypes) {
             var anEventType = eventTypes[0];
           
    var anEvent = getFactory().newEvent('org.block_r.engagement_tracker', 'EngagementEvent');
    anEvent.reportedBy = aUser.organization;
    anEvent.memberId = ev.memberId;
    anEvent.eventType = anEventType.description;
    anEvent.description = ev.description;
    emit(anEvent);
      
       });
   });

}

