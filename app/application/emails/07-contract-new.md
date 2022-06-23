alias: `contract-new`

subject: `New contract - {{ contract_name }}`

body:
`

<p>{{ user_creator_firstName }} ({{ user_creator_email }}) has created a contract with <strong>{{ tenant_creator }}</strong>.</p>
<p>
  <strong>Name</strong>: {{ contract_name }}<br/>
  <strong>Provider</strong>: {{ tenant_provider }}.<br/>
  <strong>Client</strong>: {{ tenant_client }}.<br/>
</p>

<p>
<strong>Members</strong>:<br/>
</p>
{{#members}}
  <table style="width: 100%;" width="100%" cellpadding="2" cellspacing="2">
    {{#each . }}
    <tr>
      <td border="1" colspan="2" class="attributes_item"><span><strong>{{ email }}</strong></span></td>
    </tr>
    <tr>
      <td  class="attributes_item" style="padding-bottom: 1em;">{{ first_name }} {{ last_name }}</td>
      <td  class="attributes_item" style="padding-bottom: 1em;"><span>{{role}}</span></td>
    </tr>
    {{/each}}
  </table>
{{/members}}
<br/>

<strong>Employees</strong>:<br/>
{{#employees}}

  <table style="width: 100%;" width="100%" cellpadding="2" cellspacing="2">
    {{#each . }}
    <tr>
      <td  class="attributes_item" style="padding-bottom: 1em;">{{ first_name }}</td>
      <td  class="attributes_item" style="padding-bottom: 1em;">{{ last_name }}</td>
      <td  class="attributes_item" style="padding-bottom: 1em;">{{ email }}</td>
    </tr>
    {{/each}}
  </table>
{{/employees}}

<p>
  <strong>Description</strong>: {{ contract_description }}
</p>

<!-- Border based button https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
<table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <a href="{{ action_url }}" class="button button--" target="_blank">View contract</a>
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
