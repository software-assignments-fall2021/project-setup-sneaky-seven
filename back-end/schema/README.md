## What this directory is for

This directory should contain schemas that need to eventually be exported. If there is no need to separate the compiled model from the schema itsself, please do not modularize (i.e. see `model/user.js` as an example of just having the model.)

The reason that `accessToken.js` is under this directory is that it needs to be used in the `AccessToken` model as well as in the `User` model schema to construct an array of `AccessToken`.

To summarize: schemas under schemas directory should be exported as schema itself, not as the compiled version (aka the model). Please only separate schemas from models if you must. Otherwise, have them as just a compiled model.
