<div class="profile">
	<div>this is <%= name %> layer</div>
	<ul>
		<% for(var i = 0; i < alias.length; i++) { %>
			<li><%= alias[i] %></li>
		<% } %>
	</ul>
</div>
