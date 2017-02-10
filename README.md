# Breathe

This is an Alexa skill that takes in your messages and store them into an array in the cache. It will then pull up random string from the array and remind users about it.

The following is a peek into the Sample Utterances:

```
RequestIntent tell me something
RequestIntent remind me
CreateEventIntent create a new moment of {Event}
CreateEventIntent create a new memory of {Event}
CreateEventIntent record this moment of {Event}
CreateEventIntent record this memory of {Event}
StopIntent stop
```

| Intent | Purpose |
|:-------|:------|
| RequestIntent | For the users to randomly get one of the messages they had previously recorded. |
| CreateEventIntent | For the users to record a new message (event) that provided them with positive reinforcement. |
| StopIntent | To end / quit the Alexa skill. |

###### This project is made at [SpartansHack 17](https://17.spartahack.com/).
