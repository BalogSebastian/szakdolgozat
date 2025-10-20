/dev/fd/12:25: command not found: compdef

cd ..

 cd ..

cd azonositas/

bash

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
bash-3.2$ mongosh
Current Mongosh Log ID:	68f6b3f16797f1bd369d39ff
Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.8
Using MongoDB:		8.2.0
Using Mongosh:		2.5.8

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

------
   The server generated these startup warnings when booting
   2025-10-20T09:17:52.799+02:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> use azonositas
switched to db azonositas
azonositas> show collections
felhasznalok
azonositas> db.felhasznalok.find()
[
  {
    _id: ObjectId('68f6b34f5ed482f540698108'),
    email: 'pelda@pelda.hu',
    jelszoHash: '$2a$10$gmDZe58jVtnBhN8Ae0ZSQeCA3itm5822iANM7Mc/s7JyNGFMLJAau',
    nev: 'Példa',
    _class: 'hu.szakdolgozat.azonositas.modell.Felhasznalo'
  }
]
azonositas> db.felhasznalok.find().pretty()
| 
[
  {
    _id: ObjectId('68f6b34f5ed482f540698108'),
    email: 'pelda@pelda.hu',
    jelszoHash: '$2a$10$gmDZe58jVtnBhN8Ae0ZSQeCA3itm5822iANM7Mc/s7JyNGFMLJAau',
    nev: 'Példa',
    _class: 'hu.szakdolgozat.azonositas.modell.Felhasznalo'
  }
]
azonositas> db.felhasznalok.find().pretty()
| 
[
  {
    _id: ObjectId('68f6b34f5ed482f540698108'),
    email: 'pelda@pelda.hu',
    jelszoHash: '$2a$10$gmDZe58jVtnBhN8Ae0ZSQeCA3itm5822iANM7Mc/s7JyNGFMLJAau',
    nev: 'Példa',
    _class: 'hu.szakdolgozat.azonositas.modell.Felhasznalo'
  }
]
azonositas> 

/dev/fd/14:25: command not found: compdef
balogsebastian@MacBookPro azonositas % ls -all
total 80
drwxr-xr-x@  12 balogsebastian  staff    384 Oct 20 23:53 .
drwx------@ 178 balogsebastian  staff   5696 Oct 20 23:45 ..
-rw-r--r--@   1 balogsebastian  staff     38 Oct 20 23:29 .gitattributes
-rw-r--r--@   1 balogsebastian  staff    394 Oct 20 23:29 .gitignore
drwxr-xr-x@   8 balogsebastian  staff    256 Oct 20 23:59 .idea
drwxr-xr-x@   3 balogsebastian  staff     96 Oct 20 23:29 .mvn
-rw-r--r--@   1 balogsebastian  staff   1932 Oct 20 23:29 HELP.md
-rwxr-xr-x@   1 balogsebastian  staff  11790 Oct 20 23:29 mvnw
-rw-r--r--@   1 balogsebastian  staff   8292 Oct 20 23:29 mvnw.cmd
-rw-r--r--@   1 balogsebastian  staff   4063 Oct 20 23:53 pom.xml
drwxr-xr-x@   4 balogsebastian  staff    128 Oct 20 23:29 src
drwxr-xr-x@   4 balogsebastian  staff    128 Oct 20 23:51 target
balogsebastian@MacBookPro azonositas % mongodb://localhost:27017/azonositas
zsh: no such file or directory: mongodb://localhost:27017/azonositas
balogsebastian@MacBookPro azonositas % brew tap mongodb/brew
balogsebastian@MacBookPro azonositas % brew install mongodb-community
mongodb-community 8.2.0 is already installed but outdated (so it will be upgraded).
==> Fetching downloads for: mongodb-community
==> Fetching dependencies for mongodb/brew/mongodb-community: libnghttp3, openssl@3, libngtcp2, simdjson and node
==> Downloading https://ghcr.io/v2/homebrew/core/libnghttp3/manifests/1.12.0
#################################################################################################################################################################### 100.0%
==> Fetching libnghttp3
==> Downloading https://ghcr.io/v2/homebrew/core/libnghttp3/blobs/sha256:e284d356865af5e93210253ef973a4f90692b560627eba68e54cf47527a386a5
#################################################################################################################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/openssl/3/manifests/3.6.0
#################################################################################################################################################################### 100.0%
==> Fetching openssl@3
==> Downloading https://ghcr.io/v2/homebrew/core/openssl/3/blobs/sha256:932329036867164c28752b7b35f7808530b8cd79b72246bf122f36219a79d388
#################################################################################################################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/libngtcp2/manifests/1.17.0
#################################################################################################################################################################### 100.0%
==> Fetching libngtcp2
==> Downloading https://ghcr.io/v2/homebrew/core/libngtcp2/blobs/sha256:a70f750eb0cc3afb5e199dffb127d4f688dd63c758b23ab79f95e131aecd777c
#################################################################################################################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/simdjson/manifests/4.0.7
#################################################################################################################################################################### 100.0%
==> Fetching simdjson
==> Downloading https://ghcr.io/v2/homebrew/core/simdjson/blobs/sha256:e1d7f98b560e026ccbf9ef734837b619d1af2eac6e13bf2f0732423271660f1e
#################################################################################################################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/node/manifests/24.10.0-1
#################################################################################################################################################################### 100.0%
==> Fetching node
==> Downloading https://ghcr.io/v2/homebrew/core/node/blobs/sha256:c89ca22e152b63293e4323b427bffb3f4fae6b0cfd52d342a76d07a0a0db1fd0
#################################################################################################################################################################### 100.0%
==> Fetching mongodb/brew/mongodb-community
==> Downloading https://fastdl.mongodb.org/osx/mongodb-macos-arm64-8.2.1.tgz
#################################################################################################################################################################### 100.0%
==> Upgrading mongodb/brew/mongodb-community
  8.2.0 -> 8.2.1 
==> Installing dependencies for mongodb/brew/mongodb-community: libnghttp3, openssl@3, libngtcp2, simdjson and node
==> Installing mongodb/brew/mongodb-community dependency: libnghttp3
==> Downloading https://ghcr.io/v2/homebrew/core/libnghttp3/manifests/1.12.0
Already downloaded: /Users/balogsebastian/Library/Caches/Homebrew/downloads/870c7405e7536d3964d6a4063f552f6ba7db08a1057381685a9f9c177df71c9f--libnghttp3-1.12.0.bottle_manifest.json
==> Pouring libnghttp3--1.12.0.arm64_tahoe.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libnghttp3/1.12.0: 20 files, 588.2KB
==> Installing mongodb/brew/mongodb-community dependency: openssl@3
==> Downloading https://ghcr.io/v2/homebrew/core/openssl/3/manifests/3.6.0
Already downloaded: /Users/balogsebastian/Library/Caches/Homebrew/downloads/403c903e557d19d801f4c6b4f635c9553af72a487024139a5773e636c884ef9e--openssl@3-3.6.0.bottle_manifest.json
==> Pouring openssl@3--3.6.0.arm64_tahoe.bottle.tar.gz
🍺  /opt/homebrew/Cellar/openssl@3/3.6.0: 7,609 files, 35.9MB
==> Installing mongodb/brew/mongodb-community dependency: libngtcp2
==> Downloading https://ghcr.io/v2/homebrew/core/libngtcp2/manifests/1.17.0
Already downloaded: /Users/balogsebastian/Library/Caches/Homebrew/downloads/f9ac96017064e1c9c23c32050e1fedb487cd3f6a744fc6c8bfd3a3ee8fa90605--libngtcp2-1.17.0.bottle_manifest.json
==> Pouring libngtcp2--1.17.0.arm64_tahoe.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libngtcp2/1.17.0: 21 files, 1.3MB
==> Installing mongodb/brew/mongodb-community dependency: simdjson
==> Downloading https://ghcr.io/v2/homebrew/core/simdjson/manifests/4.0.7
Already downloaded: /Users/balogsebastian/Library/Caches/Homebrew/downloads/b037dadb18347fedfc8816e145a3fee0a418844d6deb50c11adeb4ac69564964--simdjson-4.0.7.bottle_manifest.json
==> Pouring simdjson--4.0.7.arm64_tahoe.bottle.tar.gz
🍺  /opt/homebrew/Cellar/simdjson/4.0.7: 17 files, 5.9MB
==> Installing mongodb/brew/mongodb-community dependency: node
==> Downloading https://ghcr.io/v2/homebrew/core/node/manifests/24.10.0-1
Already downloaded: /Users/balogsebastian/Library/Caches/Homebrew/downloads/bd419bc4f320b2a636e664d0468dea9e55de8afe7edb0660fe38fc441f2df54b--node-24.10.0-1.bottle_manifest.json
==> Pouring node--24.10.0.arm64_tahoe.bottle.1.tar.gz
Warning: These files were overwritten during the `brew link` step:
/opt/homebrew/bin/npm
/opt/homebrew/bin/npx

They have been backed up to: /Users/balogsebastian/Library/Caches/Homebrew/Backup
==> Summary
🍺  /opt/homebrew/Cellar/node/24.10.0: 2,468 files, 75.3MB
==> Installing mongodb/brew/mongodb-community
==> Caveats
To restart mongodb/brew/mongodb-community after an upgrade:
  brew services restart mongodb/brew/mongodb-community
==> Summary
🍺  /opt/homebrew/Cellar/mongodb-community/8.2.1: 12 files, 243MB, built in 3 seconds
==> Running `brew cleanup mongodb-community`...
Disable this behaviour by setting `HOMEBREW_NO_INSTALL_CLEANUP=1`.
Hide these hints with `HOMEBREW_NO_ENV_HINTS=1` (see `man brew`).
Removing: /opt/homebrew/Cellar/mongodb-community/8.2.0... (12 files, 243MB)
Removing: /Users/balogsebastian/Library/Caches/Homebrew/mongodb-community--8.2.0.tgz... (76MB)
==> Caveats
==> mongodb-community
To restart mongodb/brew/mongodb-community after an upgrade:
  brew services restart mongodb/brew/mongodb-community
balogsebastian@MacBookPro azonositas % brew services start mongodb-community
Service `mongodb-community` already started, use `brew services restart mongodb-community` to restart.
balogsebastian@MacBookPro azonositas % brew services list
Name              Status  User           File
dbus              none                   
mongodb-community started balogsebastian ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community.plist
redis             started balogsebastian ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
balogsebastian@MacBookPro azonositas % mongosh --eval "db.adminCommand({ ping: 1 })"
{ ok: 1 }
balogsebastian@MacBookPro azonositas % 