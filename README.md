This is the new, refactored Kadet Wallet. It has now reached feature-parity with the old codebase.

To build:

- Install Vagrant with Virtualbox provisioner
- `vagrant up`
- `vagrant ssh`
- `cd /vagrant`
- `npm install --force // We need the --force flag because of a package that doesn't support Vite 6 yet.
- `npm run build`
