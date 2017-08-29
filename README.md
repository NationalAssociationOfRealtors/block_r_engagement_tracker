# Engagement Tracker of the Block R Series

The lifecycle of a Member is made up of events that occur at Local, State or National level.  Events can be committee assignments, attendence at meetings, participation in workgroups, etc.  Today, these events are tracked by each association and the information is not shared.  This system organizes event information by member instead of by association.
 
The elements of this business network are:

**Participant**
`User`

The User represents the reporting Associations.

**Assets**
`EventType`

EventType is metadata for ReportedEvents.  Instances are prepopulated and are used to classify ReportedEvents.

**Transaction**
`ReportedEvent`

ReportedEvents provides the intersection of Member, Association and the event.

**Event**
`EngagementEvent`

EngagementEvents are emitted by the system to inform listening application that events have been reported. 

**Installation**

First install Hyperledger.

Next install Hyperledger Composer

Then, from the root of this repository, issue:

```
npm install
```

**Testing**

To test this Business Network Definition in the **Test** tab:

Create a `User` participant:

```
{
  "$class": "org.block_r.engagement_tracker.User",
  "userId": "userId:89505",
  "firstName": "Tobias",
  "lastName": "Hunter",
  "organization": "Heavenly AOR",
  "phoneNumber": "800.555.1212",
  "email": "thunter@heaven_aor.org",
  "mobileNumber": "888.555.1212"
}
```

Create a `EventType` asset:

```
{
  "$class": "org.block_r.engagement_tracker.EventType",
  "eventTypeId": "eventTypeId:3",
  "description": "Committee Appointment"
}
```

Submit a `ReportedEvent` transaction for a member using the memberId from the NRDS system:

```
{
  "$class": "org.block_r.engagement_tracker.ReportedEvent",
  "memberId": "987456123",
  "description": "Leadership Team",
  "reportedBy": "userId:89505",
  "eventType": "eventTypeId:3"
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry and that a `SampleEvent` has been emitted. As a result, the value of the `assetId:1` should now be `new value` in the Asset Registry.

Congratulations!

