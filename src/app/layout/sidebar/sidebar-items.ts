import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  // {
  //   path: 'authentication/change-password',
  //   title: 'MENUITEMS.PASSWORD.TEXT',
  //   moduleName: 'Changer Mot De Passe',
  //   icon: 'home',
  //   class: '',
  //   groupTitle: false,
  //   submenu: [  
  //   ]
  // },
  {
    path: 'dashboard/dashboard3',
    title: 'MENUITEMS.HOME.TEXT',
    moduleName: 'Tableau de bord',
    icon: 'home',
    class: '',
    groupTitle: false,
    submenu: [

    ]
  },
  {
    path: 'localisation',
    title: 'MENUITEMS.ADVANCE-TABLE.TEXT',
    moduleName: 'Localisation',
    icon: 'location_searching',
    class: '',
    groupTitle: false,
    submenu: [
    ]
  }, {
    path: '',
    title: 'MENUITEMS.MATERIAL.TEXT',
    moduleName: 'Matériel',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/materiel/equipements',
        title: 'MENUITEMS.MATERIAL.LIST.DASHBOARD1',
        moduleName: 'Équipement en Point de vente',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/materiel/pieces-rechanges',
        title: 'MENUITEMS.MATERIAL.LIST.DASHBOARD2',
        moduleName: 'Équipement',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'materiel/maintenance',
        title: 'MENUITEMS.MATERIAL.LIST.DASHBOARD3',
        moduleName: 'dashboard',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'materiel/composants',
        title: 'MENUITEMS.MATERIAL.LIST.DASHBOARD4',
        moduleName: 'Composants',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.SURVEILLANCE-FONCTIONNEL.TEXT',
    moduleName: 'Surveillance fonctionnelle',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/surveillance-fonctionnelle/declencheurs-alerts',
        title: 'MENUITEMS.SURVEILLANCE-FONCTIONNEL.LIST.DASHBOARD1',
        moduleName: 'Déclencheurs d alerte',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'surveillance-fonctionnelle/alerts-equipement',
        title: 'MENUITEMS.SURVEILLANCE-FONCTIONNEL.LIST.DASHBOARD2',
        moduleName: 'Équipement',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'surveillance-fonctionnelle/alerte-systeme',
        title: 'MENUITEMS.SURVEILLANCE-FONCTIONNEL.LIST.DASHBOARD3',
        moduleName: 'dashboard',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'surveillance-fonctionnelle/equipement-avec-alertes',
        title: 'MENUITEMS.SURVEILLANCE-FONCTIONNEL.LIST.DASHBOARD4',
        moduleName: 'dashboard',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'surveillance-fonctionnelle/composant-avec-alertes',
        title: 'MENUITEMS.SURVEILLANCE-FONCTIONNEL.LIST.DASHBOARD5',
        moduleName: 'dashboard',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.SURVEILLANCE-SYSTEM.TEXT',
    moduleName: 'Surveillance système',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'surveillance-systeme/parc',
        title: 'MENUITEMS.SURVEILLANCE-SYSTEM.LIST.DASHBOARD1',
        moduleName: 'Parc',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'surveillance-systeme/equipement-systeme',
        title: 'MENUITEMS.SURVEILLANCE-SYSTEM.LIST.DASHBOARD2',
        moduleName: 'Équipement',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'surveillance-systeme/journaux-systeme',
        title: 'MENUITEMS.SURVEILLANCE-SYSTEM.LIST.DASHBOARD3',
        moduleName: 'Journaux',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.RAPPORTS.TEXT',
    moduleName: 'Rapports',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'rapports/rapports-equipement',
        title: 'MENUITEMS.RAPPORTS.LIST.DASHBOARD1',
        moduleName: 'Parc',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'rapports/rapports-pieces-rechange',
        title: 'MENUITEMS.RAPPORTS.LIST.DASHBOARD2',
        moduleName: 'Équipement',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'rapports/rapports-entre-sortie',
        title: 'MENUITEMS.RAPPORTS.LIST.DASHBOARD3',
        moduleName: 'Journaux',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: 'journaux',
    title: 'MENUITEMS.JOURNAUX.TEXT',
    moduleName: 'Journaux',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: [
    ]
  },
  {
    path: 'gestion-contenu',
    title: 'MENUITEMS.GESTION-CONTENU.TEXT',
    moduleName: 'Gestion de contenu',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: [
    ]
  },
  {
    path: 'telechargements',
    title: 'MENUITEMS.TELECHARGEMENTS.TEXT',
    moduleName: 'Téléchargements',
    icon: '',
    class: '',
    groupTitle: false,
    submenu: [
    ]
  },
  {
    path: 'certificats',
    title: 'MENUITEMS.CERTIFICATS.TEXT',
    moduleName: 'Certificats',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: [
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.ADMIN.TEXT',
    moduleName: 'administration',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/administration/list-utilisateurs',
        title: 'MENUITEMS.ADMIN.LIST.DASHBOARD1',
        moduleName: 'list-utilisateurs',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/administration/groupes-utilisateurs',
        title: 'MENUITEMS.ADMIN.LIST.DASHBOARD2',
        moduleName: 'groupes-utilisateurs',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'dashboard/dashboard3',
        title: 'MENUITEMS.ADMIN.LIST.DASHBOARD3',
        moduleName: 'dashboard',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
];
