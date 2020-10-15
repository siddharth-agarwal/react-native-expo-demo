// TODO

Useful commands:
- Install `expo-cli` with npm (`npm install -g expo-cli`)
- Build project: `yarn install`
- Run project: `expo start`

-----------------

Intro to Expo

For macOS: Click "Launch iOS Simulator" in the web interface (XCode needs to be installed for this)

Expo allows for 'hot-reloading' - the app running in the Simulator should reflect any updates/modifications to the source
code without neededing to restart the Expo daemon.

iOS and Android users can download the Expo client from the App Store/Play Store and use it with the daemon process 
described above; instead of choosing "[...] Simulator".

If both the host and mobile device are connected to the same network (and Expo is running in 'LAN' mode), the 
Expo mobile client will detect the {IP}:{port} of the host and run the compiled app on the device.


* Note: This project is currently using the 'Managed Workflow' approach described in [1] as opposed to the 'Bare Workflow'.
For now, it does not seem likely that the features in the 'Bare Workflow' model will be useful to us; regardless, migrating 
from Managed -> Bare is fairly straightforward (should it be necessary).

[1] https://docs.expo.io/introduction/managed-vs-bare/

-----------------

References:

- https://docs.expo.io/get-started/create-a-new-app/

- https://docs.expo.io/introduction/walkthrough/


