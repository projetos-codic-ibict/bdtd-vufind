<?php

namespace Bdtd\Controller;

class FaqController extends \VuFind\Controller\AbstractBase
{

  public function homeAction()
  {
    return $this->createViewModel();
  }
}
