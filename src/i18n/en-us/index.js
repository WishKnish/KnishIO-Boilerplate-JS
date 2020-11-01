export default {
  ux: {
    appTitle: 'Knish.IO JS Boilerplate',
    common: {
      close: 'Close',
      cancel: 'Cancel',
      retry: 'Try Again',
      submit: 'Submit',
      status: 'Status',
      created: 'Created',
      actions: 'Actions',
      signature: 'Unable to verify transaction signature',
      error: 'There is an error in the form. Please correct it and try again!',
      unauthorized: 'You are not authorized to access this area.',
    },
    validation: {
      thisField: 'This field',
      required: '{field} is required.',
      short: '{field} is too short.',
      long: '{field} is too long.',
      invalid: '{field} is invalid.',
      email: '{field} is not a valid email.',
    },
    user: {
      guest: 'Guest User',
      notLoggedIn: 'Not Logged In',
      admin: 'Admin Dashboard',
      anonymous: 'Anonymous User',
    },
    notifications: {
      clipboard: 'Successfully copied to the clipboard!',
      broadcastFailure: 'We had some trouble communicating with the server! Check your connection and try again.',
      otsFailure: 'Unable to validate your wallet\'s one-time signature (OTS). Reload and try again.',
      transferTokenFailure: 'An unexpected error occurred. Please contact the administrator',
    },
    roles: {
      admin: 'Administrator',
    },
    menus: {
      login: {
        header: 'Log In',
      },
      profile: {
        age: {
          header: 'Account Age',
          brandnew: 'Brand New',
        },
        wallets: {
          header: 'Wallets Overview',
          empty: {
            header: 'No wallets present',
            caption: 'Acquire some tokens!',
          },
        },
        buttons: {
          profile: 'Profile',
          backup: 'Backup',
          logout: 'Log Out',
          sync: 'Synchronize with Ledger',
          info: 'dApp Information',
          qr: 'Generate QR Code',
          send: 'Send Tokens',
        },
      },
      about: 'About',
    },
    footer: {
      privacy: 'Privacy',
      tos: 'ToS',
    },
  },
  pages: {
    home: {
      homeHero: {
        slogan: 'The Knish.IO JavaScript Playground',
        description: 'This tool was designed to help you gain a better understanding of Knish.IO concepts and use them in your applications. Need help? Join our <a class="text-primary" href="https://t.me/wishknish" target="_blank">Telegram channel</a>.',
        buttons: {
          register: 'Sign Up',
          login: 'Log In',
          dashboard: 'My Dashboard',
          logout: 'Log Out',
        },
      },
    },
    about: {
      header: {
        title: 'About WishKnish',
      },
      content: `
<p><strong>WishKnish</strong> is a technology company based out of the Washington, D.C. area. Founded in 2016, we provide interoperable enterprise solutions for corporations, government agencies and non-profits.</p>

<p>As the TCP/IP protocol is utilized to help transmit information from one computer to another, WishKnish’s distributed ledger technology, <strong>Knish.IO</strong>, gives new and existing applications the freedom to transmit data and financial transactions in a way that is:</p>

<ol>
<li><strong>Truthful</strong> - Not changed along the way to the ledger</li>
<li><strong>Trusted</strong> - Agreed upon between multiple parties on the ledger</li>
<li><strong>Transparent</strong> - All changes to data are historically maintained on the ledger</li>
</ol>

<p><strong>Knish.IO</strong> empowers a number of unique use cases that rely on trust between parties, especially in verticals like e-commerce, payments, identity, security, transportation, and supply chain.</p>

<p>Stakeholders in the public and private sector are beginning to discover blockchain technology and the concept of decentralization - and that creates an important opportunity to leverage our know-how and experience to build solutions for the evolving business landscape.</p>
        `,
    },
    profile: {
      buttons: {
        dashboard: 'My Dashboard',
        favorites: 'My Favorites',
        messages: 'My Messages',
        purchases: 'My Purchases',
      },
      header: {
        title: 'My Profile',
        subtitle: 'Welcome, {name}',
      },
      dashboard: {
        header: {
          title: 'My Dashboard',
          subtitle: 'Take advantage of critical neighborhood resources at your fingertips.',
        },
      },
      favorites: {
        header: {
          title: 'My Favorites',
          subtitle: 'Explore your personal collection of favorite brands and products.',
        },
      },
      messages: {
        header: {
          title: 'My Messages',
          subtitle: 'This is where you can manage your anonymous messaging activity.',
        },
      },
      purchases: {
        header: {
          title: 'My Purchases',
          subtitle: 'Review your past purchasing experience.',
        },
        orderPlaced: 'Order placed',
        total: 'Total',
        shipTo: 'Ship to',
        orderNumber: 'Order #',
        writeReviewLabel: 'Write a Review',
        trackPackageLabel: 'Track Package',
        contactMerchantLabel: 'Contact Merchant',
        buyAgainLabel: 'Buy It Again',
        removeFromCart: 'Remove From Cart',
      },
      footer: {
        title: 'Start Building on WishKnish',
        subtitle: 'Become a member of WishKnish Storefronts to take advantage of the world\'s foremost decentralized market platform.',
        description: 'Let\'s build something amazing together!',
      },
    },
  },
  dialogs: {
    logout: {
      bar: 'Log Out',
      header: 'You are about to log out!',
      footer: 'Local wallet storage will be cleared. Please make sure you have stored your secret key or username / password combination securely if you intend to access this account again.',
      buttons: {
        logout: 'Log Out',
      },
      success: 'You have been successfully logged out.',
    },
    backup: {
      bar: 'Backup',
      header: 'Backup Your Account',
      secret: 'Your secret key:',
      hint: 'Click the text area to copy your secret key to the clipboard.',
      footer: 'Your secret key will open all wallets, so be sure to treat it with appropriate care and avoid sending over the internet.',
    },
    restore: {
      bar: 'Restore',
      header: 'Restore Existing Account',
    },
    register: {
      bar: 'Register',
      header: 'Create a Knish.IO Account',
    },
    login: {
      bar: 'Log In',
      header: 'Log Into Your Knish.IO Account',
    },
    sendToken: {
      bar: 'Send Token',
      header: 'Send Token(s) to Another Peer',
    },
    generator: {
      bar: 'QR Generator',
      header: 'Wallet Code',
      token: 'Token:',
      balance: 'Balance:',
      bundle: 'Bundle:',
      address: 'Address:',
      position: 'Position:',
    },
  },
  forms: {
    login: {
      fields: {
        username: {
          label: 'Your Username',
        },
        password: {
          label: 'Your Password',
        },
      },
      buttons: {
        login: 'Log In',
        register: 'Register',
        restore: 'Restore',
      },
    },
    register: {
      stepper: {
        step1: 'Tell us about yourself',
        step2: 'Submit to Ledger',
        step3: 'Confirmation',
      },
      login: {
        header: 'Your login credentials:',
        caption: 'Your email address will be anonymized. Don\'t forget your email / password combination!',
      },
      profile: {
        header: 'Your profile information:',
        caption: 'Your email address will never be shared with third parties (including us).',
      },
      fields: {
        username: {
          label: 'Your Email',
          validation: {
            required: 'Email is required.',
            short: 'Email is too short.',
            long: 'Email is too long.',
            invalid: 'Email is invalid',
            exists: 'Email already registered.',
          },
        },
        password: {
          label: 'Your Password',
          validation: {
            required: 'Password is required.',
            short: 'Password is too short.',
            long: 'Password is too long.',
          },
        },
        nickname: {
          label: 'Your Anonymous Nickname',
        },
        accept: {
          label: 'I accept the Knish.IO <a href="/tos" target="_blank">terms of service</a> and <a href="/privacy" target="_blank">privacy policy</a>.',
        },
      },
      confirmation: {
        success: 'Thank you for registering, {publicName}!',
        failure: 'Your registration has been rejected.',
        duplicate: 'You are already registered! Please log in instead.',
      },
      buttons: {
        submit: 'Register a New Account',
      },
    },
    restore: {
      fields: {
        secret: {
          title: 'To restore a different account, please enter its exported secret key.',
          hint: 'Secret key must be exactly 1024 or 2048 characters in length.',
          required: 'The key is required!',
          length: 'Secret key must be exactly 1024 or 2048 characters in length.',
          hex: 'Secret key must be a valid hexadecimal string.',
        },
      },
      buttons: {
        submit: 'Restore Existing Account',
      },
    },
    sendToken: {
      fields: {
        accept: {
          label: 'I understand that transfers of tokens are not reversible and I am solely responsible for correctly choosing the recipient. I fully acknowledge and accept the risk of transferring tokens from my account, including any damages or losses resulting from this transfer.',
        },
      },
    },
  },
  tables: {
    wallets: {
      header: {
        empty: 'There are no wallets to display.',
      },
      columns: {
        rank: 'Rank',
        address: 'Address',
        bundle: 'Bundle',
        token: 'Token',
        position: 'Position',
        amount: 'Amount',
        created: 'Creation Timestamp',
      },
    },
    metas: {
      header: {
        title: 'Metadata for [ {metaType} : {metaId} ]',
        empty: 'There is no metadata to display.',
      },
      columns: {
        parameter: 'Parameter',
        value: 'Value',
        created: 'Creation Timestamp',
        molecule: 'Molecule',
      },
    },
    bundle: {
      header: {
        empty: 'No matching wallet bundle found.',
      },
      columns: {
        parameter: 'Parameter',
        value: 'Value',
        bundle: 'Bundle',
        wallets: 'Wallets',
        molecules: 'Molecules',
        meta: 'Bundle Metadata',
        created: 'Creation Timestamp',
      },
    },
    molecules: {
      header: {
        empty: 'There are no molecules to display.',
      },
      columns: {
        molecule: 'Molecule',
        cell: 'Cell',
        atoms: 'Atoms',
        created: 'Creation Timestamp',
      },
    },
    type: {
      header: {
        title: 'Instances of [ {metaType} ] Meta Type',
        empty: 'There are no meta instances to display.',
      },
      columns: {
        rank: 'Rank',
        type: 'Meta Type',
        id: 'Identifier',
        count: 'Number of Records',
        molecules: 'Contributing Molecules',
        created: 'Creation Timestamp',
      },
    },
  },
};
