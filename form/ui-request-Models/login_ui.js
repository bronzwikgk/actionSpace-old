var loginUI = {
    "name": "div",
    "attributes": {
        "id": "loginContainer",
        "class": "wrapper"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "class": "title-text"
            },
            "items": {
                "element##0": {
                    "name": "div",
                    "attributes": {
                        "class": "title login"
                    },
                    "items": {
                        "text##0": "Login"
                    }
                },
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "class": "title signup"
                    },
                    "items": {
                        "text##0": "Signup"
                    }
                }
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "form-container"
            },
            "items": {
                "element##0": {
                    "name": "div",
                    "attributes": {
                        "class": "slide-controls"
                    },
                    "items": {
                        "element##0": {
                            "name": "input",
                            "attributes": {
                                "type": "radio",
                                "name": "slide",
                                "id": "login",
                                "checked": ""
                            },
                            "items": {}
                        },
                        "element##1": {
                            "name": "input",
                            "attributes": {
                                "type": "radio",
                                "name": "slide",
                                "id": "signup"
                            },
                            "items": {}
                        },
                        "element##2": {
                            "name": "label",
                            "attributes": {
                                "data-action-type": "switchLoginOrSignup",
                                "data-action-value": "login",
                                "for": "login",
                                "class": "slide login"
                            },
                            "items": {
                                "text##0": "Login"
                            }
                        },
                        "element##3": {
                            "name": "label",
                            "attributes": {
                                "data-action-type": "switchLoginOrSignup",
                                "data-action-value": "signup",
                                "for": "signup",
                                "class": "slide signup"
                            },
                            "items": {
                                "text##0": "Signup"
                            }
                        },
                        "element##4": {
                            "name": "div",
                            "attributes": {
                                "class": "slider-tab"
                            },
                            "items": {}
                        }
                    }
                },
                "element##1": {
                    "name": "div",
                    "attributes": {
                        "class": "form-inner"
                    },
                    "items": {
                        "element##0": {
                            "name": "form",
                            "attributes": {
                                "action": "#",
                                "class": "login"
                            },
                            "items": {
                                "element##0": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "field"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "input",
                                            "attributes": {
                                                "type": "text",
                                                "placeholder": "Email Address",
                                                "required": ""
                                            },
                                            "items": {}
                                        }
                                    }
                                },
                                "element##1": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "field"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "input",
                                            "attributes": {
                                                "type": "password",
                                                "placeholder": "Password",
                                                "required": ""
                                            },
                                            "items": {}
                                        }
                                    }
                                },
                                "element##2": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "pass-link"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "a",
                                            "attributes": {
                                                "href": "#"
                                            },
                                            "items": {
                                                "text##0": "Forgot password?"
                                            }
                                        }
                                    }
                                },
                                "element##3": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "field btn"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "div",
                                            "attributes": {
                                                "class": "btn-layer"
                                            },
                                            "items": {}
                                        },
                                        "element##1": {
                                            "name": "input",
                                            "attributes": {
                                                "type": "submit",
                                                "value": "Login"
                                            },
                                            "items": {}
                                        }
                                    }
                                },
                                "element##4": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "signup-link"
                                    },
                                    "items": {
                                        "text##0": "Not a member?",
                                        "element##1": {
                                            "name": "a",
                                            "attributes": {
                                                "data-action-type": "switchLoginOrSignup",
                                                "data-action-value": "signup",
                                            },
                                            "items": {
                                                "text##0": "Signup now"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "element##1": {
                            "name": "form",
                            "attributes": {
                                "action": "#",
                                "class": "signup"
                            },
                            "items": {
                                "element##0": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "field"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "input",
                                            "attributes": {
                                                "type": "text",
                                                "placeholder": "Email Address",
                                                "required": ""
                                            },
                                            "items": {}
                                        }
                                    }
                                },
                                "element##1": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "field"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "input",
                                            "attributes": {
                                                "type": "password",
                                                "placeholder": "Password",
                                                "required": ""
                                            },
                                            "items": {}
                                        }
                                    }
                                },
                                "element##2": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "field"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "input",
                                            "attributes": {
                                                "type": "password",
                                                "placeholder": "Confirm password",
                                                "required": ""
                                            },
                                            "items": {}
                                        }
                                    }
                                },
                                "element##3": {
                                    "name": "div",
                                    "attributes": {
                                        "class": "field btn"
                                    },
                                    "items": {
                                        "element##0": {
                                            "name": "div",
                                            "attributes": {
                                                "class": "btn-layer"
                                            },
                                            "items": {}
                                        },
                                        "element##1": {
                                            "name": "input",
                                            "attributes": {
                                                "type": "submit",
                                                "value": "Signup"
                                            },
                                            "items": {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "element##2": {
            "name": "a",
            "attributes": {
                "class": "glogin",
                "data-action-type": "loginPrompt"
            },
            "items": {
                "element##0": {
                    "name": "img",
                    "attributes": {
                        "src": "./assets/gLogo.png",
                        "title": "login with google",
                        "alt": "login with google"
                    },
                    "items": {}
                }
            }
        }
    }
}

/* 

<div class="wrapper">
  <div class="title-text">
    <div class="title login">
      Login
    </div>
    <div class="title signup">
      Signup
    </div>
  </div>
  <div class="form-container">
    <div class="slide-controls">
      <input type="radio" name="slide" id="login" checked>
      <input type="radio" name="slide" id="signup">
      <label for="login" class="slide login">Login</label>
      <label for="signup" class="slide signup">Signup</label>
      <div class="slider-tab"></div>
    </div>
    <div class="form-inner">
      <form action="#" class="login">
        <div class="field">
          <input type="text" placeholder="Email Address" required>
        </div>
        <div class="field">
          <input type="password" placeholder="Password" required>
        </div>
        <div class="pass-link">
          <a href="#">Forgot password?</a>
        </div>
        <div class="field btn">
          <div class="btn-layer"></div>
          <input type="submit" value="Login">
        </div>
        <div class="signup-link">
          Not a member? <a href="">Signup now</a>
        </div>
      </form>
      <form action="#" class="signup">
        <div class="field">
          <input type="text" placeholder="Email Address" required>
        </div>
        <div class="field">
          <input type="password" placeholder="Password" required>
        </div>
        <div class="field">
          <input type="password" placeholder="Confirm password" required>
        </div>
        <div class="field btn">
          <div class="btn-layer"></div>
          <input type="submit" value="Signup">
        </div>
      </form>
    </div>
  </div>
</div>

*/