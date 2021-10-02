# TCP/IP Makes the Internet go Round

TCP/IP was originally created in the 1970s by Tim Berners-Lee as a project to enable communication for the US Department of Defense computers. The Defense Department operated a network called the Advanced Research Projects Agency Network (ARPANet) and needed to allow communication between computers in any location. ARPANet officially completed the transition to TCP/IP on January 1st, 1983 and the World Wide Web was born. Of course, the speed and diversity of connections didn't look anything like it does in modern times. Typical connectivity in 1983 involved thousands of bits of data per second over physical lines only versus billions of bits per second today on air, land, space, and sea.

As the name suggests, TCP/IP is a combination of the Transmission Control Protocol (TCP) and the Internet Protocol (IP). IP is responsible for describing the *address* of a device. Think of it as a devices "phone number". TCP is responsible for moving the data from one device IP to another. It does this by breaking data up into *packets* and providing mechanisms for ensuring that delivery has occurred. Both protocols are independent but they are designed to work together.

Further, TCP/IP is broken up into layers that are often called the OSI model. Each layer has a specific function within the TCP/IP stack:

1. Physical (e.g. cable, RJ45)
1. Data Link (e.g. MAC, switches)
1. Network (e.g. IP, routers)
1. Transport (e.g. TCP, UDP, port numbers)
1. Session (e.g. Syn/Ack)
1. Presentation (e.g. encryption, ASCII, PNG, MIDI)
1. Application (e.g. SNMP, HTTP, FTP)

For home networking purposes we are typically concerned with Layers 1 (the cables), 3 (IPs), 4 (protocol and port), and 7 (HTTP, email, file transfer, etc.). For this guide, we're going to assume everyone can figure out how to plug in a network cable and begin our focus with Layer 3.

## Working with IPs

Since the majority of homes are still utilizing IPv4 we will focus on that subject. Look for an IPv6 guide to be added some time in the future. Likewise, we'll focus primarily on the IP Address and Subnet itself. If you want all the really gory detail we highly recommend reading Cisco's article [IP Addressing and Subnetting for New Users](https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html).

### The IP Address

An IP is made up of four (4) *octets* (32 bits of data) ranging from 0 to 255 (e.g. 192.168.0.1). These digits represent both the network and the host where a device resides. There are public and private addresses and certain ranges of addresses are reserved for specific uses. Public address ranges are managed and allocated by [ICANN](https://www.icann.org). When a home router receives a public IP from an ISP that IP was first granted to the ISP by ICANN. All IP addresses are loosely tied to a geographical location. IP addresses can be broken up into ranges and used in subnets. A subnet is a specific range of IP addresses. Your home network will have one or more subnets (typically one for household members and one for the guests).

### Finding Your Machine's IP

#### On Windows

Open a CMD window and type the following:

```bash
> ipconfig

Ethernet adapter Ethernet:

   IPv4 Address. . . . . . . . . . . : 192.168.192.4
   Subnet Mask . . . . . . . . . . . : 255.255.248.0
   Default Gateway . . . . . . . . . : 192.168.192.1
```

#### On Mac

Open a terminal window and type:

```bash
> ifconfig

 eth0      Link encap:Ethernet  HWaddr 00:0F:20:CF:8B:42
           inet addr:192.168.192.4  Bcast:  Mask:255.255.248.0
           UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
           RX packets:2472694671 errors:1 dropped:0 overruns:0 frame:0
           TX packets:44641779 errors:0 dropped:0 overruns:0 carrier:0
           collisions:0 txqueuelen:1000
           RX bytes:1761467179 (1679.7 Mb)  TX bytes:2870928587 (2737.9 Mb)
           Interrupt:28
```

In the above examples the machine's IP is 192.168.192.4 on the 192.168.192.0/20 network. We discuss what the "slash 20" means in the next section.

### Subnets, Subnet Masks, and CIDR Notation

In creating networks we need to tell our router which address ranges are down which physical ports (i.e. the cable jacks on the router or the wifi itself). To do this we can break IPs into ranges based on each octet. For instance, if we want to have 255 addresses available to use at home we would want 192.168.0.0 to 192.168.0.255. This can be represented two different ways: via subnet mask or CIDR notation. Using a subnet mask we say `192.168.0.0 255.255.255.0`. This means that we start at `192.168.0.0` and all 255 IPs are available in the last octet. if we only wanted 192.168.0.0 to 192.168.0.128 available we would write it as `192.168.0.0 255.255.255.128` which would give us 192.168.0.0 to 192.168.0.127.

The second method is to use Classless Inter-Domain Routing (CIDR) notation. CIDR notation works by describing how many *bits* are available to the subnet. Stating 192.168.0.0/24 (stated "a slash 24") means that the entire last octet (8 bits of 32) are available (i.e. 192.168.0.0 to 192.168.0.255). If the CIDR notation was 192.168.0.0/25 that is equivalent to half the remaining addresses because the first *bit* of the last octet is fixed meaning only the remaining seven can be changed (effectively halving the total number of addressses available).

- A "slash 8" address would allow for the last three octets to be changed. So 10.0.0.0/8 would give us 10.0.0.0 to 10.255.255.255 available or 16,777,216 IPs.
- The "slash 20" from above means that 12 bits are available for use. This provides any address from 192.168.192.0 to 192.168.207.255.
- 0.0.0.0/0 means all the IPv4 addresses in the entire world.

We highly recommend using IP Address Guide's [CIDR to IPv4 Conversion](https://www.ipaddressguide.com/cidr) utility to plan your subnets.

### Private Reserved Ranges

There are three ranges available for non-public use. These ranges will not route over the public internet. They are:

| Range | CIDR | Subnet Mask | IPs Available |
|-------|------|-------------|---------------|
| Class A: 10.0.0.0 to 10.255.255.255 &nbsp;&nbsp; | 10.0.0.0/8 &nbsp;&nbsp; | 0.255.255.255 &nbsp;&nbsp; | 16,777,216 |
| Class B: 172.16.0.0 to 172.31.255.255 &nbsp;&nbsp; | 172.16.0.0/12 &nbsp;&nbsp; | 0.15.255.255 &nbsp;&nbsp; | 1,048,576 |
| Class C: 192.168.0.0 to 192.168.255.255 &nbsp;&nbsp; | 172.168.0.0/16 &nbsp;&nbsp; | 0.0.255.255 &nbsp;&nbsp; | 65,536 |

Most home networks are based around the last CIDR (192.168.0.0/16) and most corporations used the first CIDR (10.0.0.0/8). If you routinely VPN into work from home then it is recommended to take your company's IP choice into account when planning your home network.

### Other Reserved Ranges

There are quite a few ranges that are reserved for various purposes. The full list is available at the [IANA IPv4 Special-Purpose Address Registry](https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml).

## Layer 4: Ports and Protocols

Each IP address can communicate over digital channels called *ports*. The ports range from 0 to 65,536 and represent a different wavelength on the signal between to network interfaces. Most services use a well-known, predefined, port. For example, when a user browses to a website they are doing so over HTTPS which runs on port 443 using TCP. When email is sent that often happens over the Simple Mail Transport Protocol (SMTP) which runs on port 25, again using TCP.

This is a good point to mention a concept similar to TCP: UDP. The User Datagram Protocol (UDP) provides an alternative method to transport packets to their destination. As mentioned before, TCP ensures packets are delivered to their destination. UDP sends packets but does not care if they reach their destination. In video games, UDP is often used to represent player locations in the game since, if a UDP packet does not make it to your computer (with the opposing player's location inside the packet) a new UDP packet with the opposing player's latest location can simply be sent.

Communication on ports is either *inbound* or *outbound* from the *device's* perspective. When I browse a web page, my request for the web page is *outbound* from my web browser and *inbound* from the web site's server perspective. This concept is important since it forms the cornerstone of protected your home network from malicious actors. In general, home networks disallow all inbound traffic and allow all outbound traffic. Corporations generally block both directions by default since they only want to allow very specific ports access to the internet.

Occasionally, home users will allow inbound traffic to a device such as a game console or gaming PC. In these instances it is still wise to lock down the inbound flow to only the ports and protocols (TCP or UDP) required by the game. Most game vendors will list the requirements on their web sites.

One more item to note: if your home network has a trusted network and a guest network they should generally not allow inbound or outbound traffic between them on any port. Keep the two networks completely isolated. This is NOT true for an IOT network where the IOT network will generally allow any traffic from the trusted network and the trusted network may allow *a few* ports from the IOT network to support protocols like Apple Play.

## DHCP

Dynamic Host Configuration Protocol (DHCP) provides a method for automatically assigning IPs to devices within a subnet. Most ISP supplied devices (like cable modems) are already setup to use DHCP. This means when you add a computer or mobile phone to a network it gets an IP address automatically assigned. DHCP also supports providing other information such as which DNS servers to use. In general, home network users will always want to use DHCP. DHCP does support assigning specific IPs to specific devices if so desired. While the DHCP protocol is the same for all devices, the method of setup varies by device. For this reason configuring DHCP is outside the scope of this document.
