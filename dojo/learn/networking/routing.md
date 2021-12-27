---
title: Routing TCP/IP Traffic
globalcategory: learn
imagegallery: ['media/networking.jpg']
---

# Routing TCP/IP Traffic

You can think of TCP/IP routing as Google Maps for the internet; without it, the packets leaving your workstation would not know how to find the web server behind the web address in your browser. Having said that, it is important to remember that a TCP/IP route does not define the entire path to the destination, only the *next* segment of the journey. There are five types of routes:

- **broadcast route:** Default route for all broadcast packets. Two broadcast routes are automatically assigned to each subnet on which the network has an IP (one to the subnet address and one to the broadcast address of the subnet).
- **default route:** Defines a gateway to use when a host or network route to a destination is not otherwise defined.
- **host route:** Defines a gateway that can forward packets to a specific host on another network.
- **loopback route:** Default route for all packets sent to local network addresses. The loopback route IP is always 127.0.0.1.
- **network route:** Defines a gateway that can forward packets to any of the hosts on a specific network.

For home networking purposes, we will mainly be concerned with the **default route**. The default route (sometimes identified as the 0.0.0.0/0 route) tells devices on our home network where to send TCP/IP packets to in order to get to the internet. This is typically the device our ISP provided (i.e. where our home internet connection plugs in). Most home routers use DHCP to assign addresses to devices and will also assign the default gateway.

We can view the default gateway and default route on our **Windows** workstation via the command prompt (Mac instructions below):

```bash
> ipconfig

Ethernet adapter Ethernet:

   Link-local IPv6 Address . . . . . : fe80::6c17:ef88:5326:1636%5
   IPv4 Address. . . . . . . . . . . : 192.168.192.4
   Subnet Mask . . . . . . . . . . . : 255.255.248.0
   Default Gateway . . . . . . . . . : 192.168.192.1 <- default gateway
```

We can also print out the entire table of routes:

```bash
> route print

IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0    192.168.192.1    192.168.192.4     25 <- default route
        127.0.0.0        255.0.0.0         On-link         127.0.0.1    331
        127.0.0.1  255.255.255.255         On-link         127.0.0.1    331
  127.255.255.255  255.255.255.255         On-link         127.0.0.1    331
       172.26.0.0    255.255.240.0         On-link        172.26.0.1   5256
       172.26.0.1  255.255.255.255         On-link        172.26.0.1   5256
    172.26.15.255  255.255.255.255         On-link        172.26.0.1   5256
    192.168.192.0    255.255.248.0         On-link     192.168.192.4    281
    192.168.192.4  255.255.255.255         On-link     192.168.192.4    281
  192.168.199.255  255.255.255.255         On-link     192.168.192.4    281
        224.0.0.0        240.0.0.0         On-link         127.0.0.1    331
        224.0.0.0        240.0.0.0         On-link     192.168.192.4    281
        224.0.0.0        240.0.0.0         On-link        172.26.0.1   5256
  255.255.255.255  255.255.255.255         On-link         127.0.0.1    331
  255.255.255.255  255.255.255.255         On-link     192.168.192.4    281
  255.255.255.255  255.255.255.255         On-link        172.26.0.1   5256
===========================================================================
```

**Mac** users would use a terminal window and the commands `ifconfig` and `netstat -rn` respectively.

## Custom Routes

Custom routes allow us to route packets to different locations. If we had multiple gateway devices (sometimes occurs in roommate situations) then we may need to add a custom route to find devices behind another router.

To add custom routes (called *static* routes) to our route table we use the `route add` command:

```bash
> route ADD <destination_network> MASK <subnet_mask>  <gateway_ip> <metric_cost>
```

To remove a custom route we use `route delete`:

```bash
> route DELETE <destination_network>
```

**Mac** users are a little different:

```bash
> sudo route -n add <network cidr> <gateway_ip>
```

```bash
> sudo route -n delete <network cidr> <gateway_ip>
```

