<?php

return array(
  'controllers' =>
  array(
    'factories' =>
    array(
      'Bdtd\\Controller\\AboutController' => 'VuFind\\Controller\\AbstractBaseFactory',
      'Bdtd\\Controller\\FaqController' => 'VuFind\\Controller\\AbstractBaseFactory',
      'Bdtd\\Controller\\DataSourcesController' => 'VuFind\\Controller\\AbstractBaseFactory',
      'Bdtd\\Controller\\IndicatorsController' => 'VuFind\\Controller\\AbstractBaseFactory',
      'Bdtd\\Controller\\BulkExportController' => 'VuFind\\Controller\\AbstractBaseFactory',
    ),
    'aliases' =>
    array(
      'About' => 'Bdtd\\Controller\\AboutController',
      'about' => 'Bdtd\\Controller\\AboutController',
      'Faq' => 'Bdtd\\Controller\\FaqController',
      'faq' => 'Bdtd\\Controller\\FaqController',
      'DataSources' => 'Bdtd\\Controller\\DataSourcesController',
      'datasources' => 'Bdtd\\Controller\\DataSourcesController',
      'Indicators' => 'Bdtd\\Controller\\IndicatorsController',
      'indicators' => 'Bdtd\\Controller\\IndicatorsController',
      'BulkExport' => 'Bdtd\\Controller\\BulkExportController',
      'bulkexport' => 'Bdtd\\Controller\\BulkExportController',
    ),
  ),
  'router' =>
  array(
    'routes' =>
    array(
      'about-home' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/about/home',
          'defaults' =>
          array(
            'controller' => 'About',
            'action' => 'Home',
          ),
        ),
      ),
      'faq-home' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/faq/home',
          'defaults' =>
          array(
            'controller' => 'Faq',
            'action' => 'Home',
          ),
        ),
      ),
      'datasources-home' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/datasources/home',
          'defaults' =>
          array(
            'controller' => 'DataSources',
            'action' => 'Home',
          ),
        ),
      ),
      'indicators-home' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/indicators/home',
          'defaults' =>
          array(
            'controller' => 'Indicators',
            'action' => 'Home',
          ),
        ),
      ),
      'datasources-datasource' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/DataSources/Datasource',
          'defaults' =>
          array(
            'controller' => 'DataSources',
            'action' => 'Datasource',
          ),
        ),
      ),
      'bulkexport-home' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/bulkexport/home',
          'defaults' =>
          array(
            'controller' => 'BulkExport',
            'action' => 'Home',
          ),
        ),
      ),
      'bulkexport-csv' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/bulkexport/csv',
          'defaults' =>
          array(
            'controller' => 'BulkExport',
            'action' => 'CSV',
          ),
        ),
      ),
      'bulkexport-download' =>
      array(
        'type' => 'Laminas\\Router\\Http\\Literal',
        'options' =>
        array(
          'route' => '/bulkexport/download',
          'defaults' =>
          array(
            'controller' => 'BulkExport',
            'action' => 'Download',
          ),
        ),
      ),
    ),
  ),
  'vufind' =>
  array(
    'plugin_managers' =>
    array(
      'recorddriver' =>
      array(
        'factories' =>
        array(
          'Bdtd\\RecordDriver\\SolrDefault' => 'Bdtd\\RecordDriver\\SolrDefaultFactory',
        ),
        'aliases' =>
        array(
          'VuFind\\RecordDriver\\SolrDefault' => 'Bdtd\\RecordDriver\\SolrDefault',
        ),
      ),
    ),
  ),
);
