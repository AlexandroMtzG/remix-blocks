alias: `create-linked-account`

subject: `{{ invite_sender_name }} has invited you to link {{ tenant_creator }}`

body:
`

<h1>Hi {{name}},</h1>
<p>{{invite_sender_name}} ({{invite_sender_email}}) has invited you to link your organization <strong>{{tenant_invitee}}</strong> with their organization <strong>{{tenant_creator}}</strong> {{ invitation_role }}.</p>
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
                  <a href="{{action_url}}" class="button button--" target="_blank">Accept invitation</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

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
