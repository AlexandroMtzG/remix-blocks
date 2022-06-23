alias: `password-reset`

subject: `Set up a new password for {{product_name}}`

body:
`
<h1>Hi {{name}},</h1>
<p>You recently requested to reset your password for your {{ product_name }} account. Use the button below to reset it.</p>
<!-- Action -->
<table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">
      <!-- Border based button https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <a href="{{action_url}}" class="button button--" target="_blank">Reset your password</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<p>If you did not request a password reset, please ignore this email or <a href="mailto:{{support_email}}">contact support</a> if you have questions.</p>

<!-- End -->

<p>If you have any questions, feel free to <a href="mailto:{{support_email}}">email our customer success team</a>.

<p>Thanks,
<br>{{ sender_name }}</p>
<p><strong>P.S.</strong> Need immediate help getting started? Just reply to this email, the {{ product_name }} support team is always ready to help!</p>

<!-- Sub copy -->

<table class="body-sub">
  <tr>
    <td>
      <p class="sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
      <p class="sub">{{action_url}}</p>
    </td>
  </tr>
</table>
`