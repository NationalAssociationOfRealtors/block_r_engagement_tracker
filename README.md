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

1. Install [Hyperledger Development Tools] (https://github.com/hyperledger/composer-tools/tree/master/packages/fabric-dev-servers)

You should always use the documentation, but the following sequence is close.  It assumes, as does the documentation, that you will be building everything in your home account is a directory called "fabric-tools".  Substitute the directory of your choice.

```
$ mkdir ~/fabric-tools && cd ~/fabric-tools
$ curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
$ tar xzf fabric-dev-servers.tar.gz
```

2. Start Fabric

```
$ cd ~/fabric-tools
$ ./downloadFabric.sh
$ ./startFabric.sh
```

You may find that some directories need to be shared with Docker on OSX.

Hyperledger is now running.

Stopping fabric is as sinple as

```
$ cd ~/fabric-tools
$ ./stopFabric.sh
```

3. You need to create a connection profile for the network only once:

```
$ cd ~/fabric-tools
$ ./createComposerProfile.sh
```

This creates a connection.json connection profile in the directory "~/.composer-connection-profiles/hlfv1".

```
$ cd ~/.composer-connection-profiles
$ mkdir block_r && cd block_r
$ cp ../hlfv1/connection.json .
```

This connection profile is needed later in step #6,

4. Install Composer tools

From the directory of your choice, install the node-base Composer tools.  There will be many warnings about deprecated packages, these are safe to ignore at the moment.

```
npm install -g composer-cli
npm install -g generator-hyperledger-composer
npm install -g composer-rest-server
npm install -g yo
```

5. Install this package

From the root of this repository:

```
npm install
```

You should end up with a .bpa file in the ./dist directory

6.  Install the .bpa into a running Fabric system from step #2 above

```
composer network deploy -p block_r -a ./dist/block-r-engagement-tracker.bna -i PeerAdmin -s x
```

The -p argument identifies the connection profile you set up in step #3.

6. Start the Composer REST Server with Fabric running from step #2 above

```
composer-rest-server
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

