# This imports all the layers for "sf-welcome-view" into sfWelcomeViewLayers
view = Framer.Importer.load "imported/sf-welcome-view"

# Make all the imported layers available on the root
for layerGroupName of view
  window[layerGroupName] = view[layerGroupName]
for layerGroupName of view
  view[layerGroupName].originalFrame = window[layerGroupName].frame

# Animation settings
animateInCurve = "spring(400,30,0)"
animateOutCurve = "spring(350,35,0)"
noBounceCurve = "cubic-bezier"
noBounceCurveSpeed = "0.22"

Framer.Defaults.Animation.curve = animateInCurve

indicators = view.sf_indicators
indicatorActive = view.sf_indicator_active
createAccountView = view.sf_create_account
createProfileView = view.sf_create_profile
linkPaymentView = view.sf_link_payment
shippingInfoView = view.sf_shipping_info
# Welcome view layers
btnSignUp = view.sf_btn_sign_up
btnFbSignUp = view.sf_btn_sign_in_with_fb
# Create account view layers
btnBack = view.sf_icn_back
btnBack.z = 5
navbarAccountTitle = view.sf_navbar_title_create_account
btnJoin = view.sf_btn_join
accountFields = view.sf_fields_account
fbConnectedAs = view.sf_fb_connected_as
keyboard = view.sf_keyboard
# Create profile view layers
navbarProfileTitle = view.sf_navbar_title_create_profile
profileFields = view.sf_fields_profile
btnNext = view.sf_btn_next_profile
# Link payment view layers
navbarPaymentTitle = view.sf_navbar_title_link_payment
paymentFields = view.sf_fields_payment
btnNext2 = view.sf_btn_next_payment
# Shipping info view layers
navbarShippingTitle = view.sf_navbar_title_shipping_info


# Layer defaults
createAccountView.x = 640
createProfileView.x = 640
linkPaymentView.x = 640
shippingInfoView.x = 640
indicators.x = 640
indicators.y = 140
keyboard.y = 1136
fbConnectedAs.opacity = 0


changeView = (scene) ->
  switch scene
    when 1
      createAccountView.animate
        properties: {x:0}
      indicators.opacity = 1
      indicators.animate
        delay: 0.3
        properties: {x:276, y:140, opacity:1}
      keyboard.animate
        delay: 0.25
        properties: {y: 704}
    when 2
      createAccountView.animate
        properties: {x:0}
      indicators.animate
        delay: 0.3
        properties: {x:276, y:140, opacity:1}
      fbConnectedAs.animate
        delay: 0.5
        properties: {opacity: 1}
      keyboard.animate
        delay: 0.25
        properties: {y: 704}
    when 3
      # Animate out
      navbarAccountTitle.animate
        properties: {x:-navbarAccountTitle.width, opacity:0}
      accountFields.animate
        properties: {x:-accountFields.width}
      btnJoin.animate
        properties: {opacity:0}
      # Animate in
      createProfileView.animate
        properties: {x:0}
      navbarProfileTitle.animate
        properties: {x:170}
      indicatorActive.animate
        properties: {x:28}
      fbConnectedAs.animate
        properties: {y: 467}
    when 4
      # Animate out
      navbarProfileTitle.animate
        properties: {x:-navbarProfileTitle.width, opacity:0}
      profileFields.animate
        properties: {x:-profileFields.width}
      keyboard.animate
        properties: {y:1136}
      fbConnectedAs.opacity = 0
      btnNext.opacity = 0
      # Animate in
      linkPaymentView.animate
        properties: {x:-24}
      navbarPaymentTitle.animate
        properties: {x:185}
      indicatorActive.animate
        properties: {x:52}
    when 5
      # Animate out
      navbarPaymentTitle.animate
        properties: {x:-navbarPaymentTitle.width, opacity:0}
      paymentFields.animate
        properties: {x:-paymentFields.width}
      btnNext2.opacity = 0
      # Animate in
      shippingInfoView.animate
        properties: {x:-24}
      navbarShippingTitle.animate
        properties: {x:195}
      indicatorActive.animate
        properties: {x:75}

# Change View Events
# Show Create account view
btnSignUp.on Events.Click, (e) -> changeView(1)
btnFbSignUp.on Events.Click, (e) -> changeView(2)
# Show Create profile view events
btnBack.on Events.Click, (e) ->
  indicators.opacity = 0
  indicators.x = 640
  createAccountView.animate
    properties: {x: 640}
  keyboard.animate
    properties: {y: 1136}
btnJoin.on Events.Click, (e) -> changeView(3)
# Create profile view events
btnNext.on Events.Click, (e) -> changeView(4)
btnNext2.on Events.Click, (e) -> changeView(5)




