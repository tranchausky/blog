---
title: "Connect remote desktop with cloudflare tunner"
date: 2025-07-23
---



# at remote desktop server
add tunner with domain

```
rdk-example.chaucc.top -> rdp://172.30.0.1:3389
```


# at cline t comuter
```
https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/rdp/rdp-cloudflared-authentication/

1. have remote desktop server domain example rdk-example.chaucc.top
2. can (permission authen)
3. Connect as a user
- Install cloudflared on the client machine https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
- Run this command to open an RDP listening port
cloudflared access rdp --hostname rdk-example.chaucc.top --url rdp://localhost:3389111

Then

Open Microsoft Remote Desktop and select Add a PC.
For PC name, enter localhost:3389111
For User account, enter your RDP server username and password.
Double-click the newly added PC.
When asked if you want to continue, select Continue.
```
