(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=0;function t(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}function n(t){return t==null?`safe-id-${++e}`:String(t).replace(/[^a-z0-9_-]/gi,`-`)}function r(e){if(typeof e==`string`&&/^\d{4}-\d{2}-\d{2}$/.test(e)){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}return new Date(e)}function i(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function a(e,t){return new Intl.RelativeTimeFormat(`en`,{numeric:`auto`}).format(e,t)}function o(e){let t=Math.floor(e/6e4),n=Math.floor(t/60),r=t%60;return n>=1&&r>=1?`Due in ${n} ${n===1?`hour`:`hours`} ${r} ${r===1?`minute`:`minutes`}`:n>=1?`Due in ${n} ${n===1?`hour`:`hours`}`:r>=1?`Due in ${r} ${r===1?`minute`:`minutes`}`:`Due now`}function s(e){let t=r(e);if(Number.isNaN(t.getTime()))return`Invalid date`;let n=new Date,s=t.getTime()-n.getTime(),c=i(t),l=i(n),u=Math.round((c-l)/864e5);if(s<0){let e=Math.abs(s),t=Math.floor(e/6e4),n=Math.floor(e/36e5),r=Math.floor(e/864e5);if(r>=1)return`Overdue by ${r} ${r===1?`day`:`days`}`;if(n>=1){let t=Math.floor(e%36e5/6e4);return n<6&&t>0?`Overdue by ${n} ${n===1?`hour`:`hours`} ${t} ${t===1?`minute`:`minutes`}`:`Overdue by ${n} ${n===1?`hour`:`hours`}`}return t>=1?`Overdue by ${t} ${t===1?`minute`:`minutes`}`:`Due now!`}if(u===0){let e=Math.floor(s/36e5);if(e<6)return o(s);if(e>=1)return`Due ${a(e,`hour`)}`;let t=Math.floor(s/6e4);return t>=1?`Due ${a(t,`minute`)}`:`Due now`}return u===1?`Due tomorrow at ${new Intl.DateTimeFormat(`en`,{hour:`numeric`,minute:`2-digit`}).format(t)}`:u>1&&u<=6?`Due ${a(u,`day`)}`:`Due ${new Intl.DateTimeFormat(`en`,{dateStyle:`medium`}).format(t)}`}function c(e){if(e==null)return!1;let t=r(e);if(Number.isNaN(t.getTime()))return!1;let n=new Date;return t.getTime()<n.getTime()}function l(e){let r=t(e.title),i=t(e.description),a=t(e.priority),o=t(e.status),s=t(e.dueDateFormatted),c=t(e.timeRemaining),l=t(e.dueDateISO),u=n(e.id),d=[`todo-card`,`todo-card--viewing`];e.completed&&d.push(`is-done`);let f=a.toLowerCase(),p=o===`Done`||e.completed?`Done`:o,m=l?l.split(`T`)[0]:``;return`
    <article class="${d.join(` `)}" data-testid="test-todo-card">
      <header class="todo-card__header">
        <h3 class="todo-card__title" data-testid="test-todo-title">
          ${e.completed?`<span class="sr-only">Completed: </span>`:``}
          ${r}
        </h3>

        <!-- Expand/Collapse toggle -->
        <button
          type="button"
          class="todo-card__expand-toggle"
          data-testid="test-todo-expand-toggle"
          aria-expanded="false"
          aria-controls="todo-description-${u}"
          aria-label="Toggle description visibility"
        >▾</button>

        <!-- View mode description -->
        <p class="todo-card__description"
           data-testid="test-todo-description"
           id="todo-description-${u}">${i}</p>

        <!-- Edit form (hidden by default) -->
        <form class="todo-card__edit-form"
              data-testid="test-todo-edit-form"
              hidden>
          <div class="todo-card__edit-field">
            <label for="edit-title-${u}">Title</label>
            <input type="text"
                   id="edit-title-${u}"
                   name="title"
                   data-testid="test-todo-edit-title"
                   value="${r}"
                   required>
          </div>

          <div class="todo-card__edit-field">
            <label for="edit-description-${u}">Description</label>
            <textarea id="edit-description-${u}"
                      name="description"
                      data-testid="test-todo-edit-description">${i}</textarea>
          </div>

          <div class="todo-card__edit-field">
            <label for="edit-priority-${u}">Priority</label>
            <select id="edit-priority-${u}"
                    name="priority"
                    data-testid="test-todo-edit-priority">
              <option value="High" ${a===`High`?`selected`:``}>High</option>
              <option value="Medium" ${a===`Medium`?`selected`:``}>Medium</option>
              <option value="Low" ${a===`Low`?`selected`:``}>Low</option>
            </select>
          </div>

          <div class="todo-card__edit-field">
            <label for="edit-due-date-${u}">Due Date</label>
            <input type="date"
                   id="edit-due-date-${u}"
                   name="dueDate"
                   data-testid="test-todo-edit-due-date"
                   value="${m}">
          </div>

          <div class="todo-card__edit-actions">
            <button type="button"
                    class="todo-card__btn todo-card__btn--secondary"
                    data-testid="test-todo-cancel-button">Cancel</button>
            <button type="submit"
                    class="todo-card__btn todo-card__btn--primary"
                    data-testid="test-todo-save-button">Save</button>
          </div>
        </form>
      </header>

      <div class="todo-card__meta" role="group" aria-label="Todo metadata">
        <dl>
          <div class="todo-card__meta-item">
            <dt>Priority</dt>
            <dd>
              <span class="todo-card__priority" data-priority="${f}" data-testid="test-todo-priority">${a}</span>
              <span class="todo-card__priority-indicator" data-testid="test-todo-priority-indicator" aria-hidden="true"></span>
            </dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Status</dt>
            <dd data-testid="test-todo-status">${o}</dd>
            <select class="todo-card__status-select"
                    data-testid="test-todo-status-select"
                    aria-label="Change status">
              <option value="Pending" ${p===`Pending`?`selected`:``}>Pending</option>
              <option value="In Progress" ${p===`In Progress`?`selected`:``}>In Progress</option>
              <option value="Done" ${p===`Done`?`selected`:``}>Done</option>
            </select>
          </div>
          <div class="todo-card__meta-item">
            <dt>Due Date</dt>
            <dd>
              <time data-testid="test-todo-due-date" datetime="${l}">${s}</time>
            </dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Time Remaining</dt>
            <dd class="todo-card__time-remaining-wrapper">
              <time data-testid="test-todo-time-remaining" datetime="${l}">${c}</time>
              <span class="todo-card__overdue-indicator" data-testid="test-todo-overdue-indicator" hidden>Overdue</span>
            </dd>
          </div>
        </dl>
      </div>

      <section class="todo-card__tags-section" data-testid="test-todo-tags-section">
        <div class="todo-card__tags-header">
          <h4>Tags</h4>
          <button type="button" class="todo-card__expand-toggle" data-testid="test-todo-expand-toggle" aria-expanded="true" aria-controls="test-todo-collapsible-section">▼</button>
        </div>
        <section id="test-todo-collapsible-section" class="todo-card__collapsible" data-testid="test-todo-collapsible-section">
          <ul class="todo-card__tags tag-list" data-testid="test-todo-tags" aria-label="Tags list">
            ${(Array.isArray(e.tags)?e.tags:[]).map(e=>`<li class="todo-card__tag" data-testid="test-todo-tag-${n(e)}">${t(e)}</li>`).join(``)}
          </ul>
        </section>
      </section>

      <footer class="todo-card__footer">
        <label for="todo-complete-${u}">
          <input type="checkbox" id="todo-complete-${u}" data-testid="test-todo-complete-toggle" ${e.completed?`checked`:``}>
          Mark as complete
        </label>
        <div class="todo-card__actions">
          <button type="button" class="todo-card__btn" data-testid="test-todo-edit-button" aria-label="Edit ${r}">Edit</button>
          <button type="button" class="todo-card__btn" data-testid="test-todo-delete-button" aria-label="Delete ${r}">Delete</button>
        </div>
      </footer>
    </article>
  `}function u(e,t){let n={isEditing:!1,isExpanded:!1,data:{title:t.title||``,description:t.description||``,status:t.status||``,priority:t.priority||``,dueDate:t.dueDateISO||t.dueDate||``,dueDateFormatted:t.dueDateFormatted||``,timeRemaining:t.timeRemaining||``,tags:t.tags||[],completed:t.completed||!1,id:t.id||``}},r={};function i(){r.title&&(r.title.textContent=n.data.completed?`Completed: ${n.data.title}`:n.data.title),r.description&&(r.description.textContent=n.data.description),r.status&&(r.status.textContent=n.data.completed?`Done`:n.data.status),r.priority&&(r.priority.textContent=n.data.priority,r.priority.setAttribute(`data-priority`,n.data.priority.toLowerCase())),r.dueDate&&(r.dueDate.setAttribute(`datetime`,n.data.dueDate),r.dueDate.textContent=n.data.dueDateFormatted),r.timeRemaining&&(r.timeRemaining.setAttribute(`datetime`,n.data.dueDate),r.timeRemaining.textContent=n.data.timeRemaining),r.card&&(n.isEditing?(r.card.classList.add(`is-editing`),r.card.classList.remove(`todo-card--viewing`),r.card.classList.add(`todo-card--editing`)):(r.card.classList.remove(`is-editing`),r.card.classList.remove(`todo-card--editing`),r.card.classList.add(`todo-card--viewing`)),n.isExpanded?r.card.classList.add(`is-expanded`):r.card.classList.remove(`is-expanded`),n.data.completed?r.card.classList.add(`is-done`):r.card.classList.remove(`is-done`)),r.expandToggle&&r.expandToggle.setAttribute(`aria-expanded`,n.isExpanded?`true`:`false`),r.checkbox&&(r.checkbox.checked=n.data.completed),r.statusSelect&&(r.statusSelect.value=n.data.completed?`Done`:n.data.status),r.editForm&&(r.editForm.hidden=!n.isEditing)}function a(){e.innerHTML=l(n.data),r.card=e.querySelector(`[data-testid="test-todo-card"]`),r.title=e.querySelector(`[data-testid="test-todo-title"]`),r.description=e.querySelector(`[data-testid="test-todo-description"]`),r.status=e.querySelector(`[data-testid="test-todo-status"]`),r.statusSelect=e.querySelector(`[data-testid="test-todo-status-select"]`),r.priority=e.querySelector(`[data-testid="test-todo-priority"]`),r.dueDate=e.querySelector(`[data-testid="test-todo-due-date"]`),r.timeRemaining=e.querySelector(`[data-testid="test-todo-time-remaining"]`),r.checkbox=e.querySelector(`[data-testid="test-todo-complete-toggle"]`),r.editButton=e.querySelector(`[data-testid="test-todo-edit-button"]`),r.deleteButton=e.querySelector(`[data-testid="test-todo-delete-button"]`),r.expandToggle=e.querySelector(`[data-testid="test-todo-expand-toggle"]`),r.editForm=e.querySelector(`[data-testid="test-todo-edit-form"]`),r.saveButton=e.querySelector(`[data-testid="test-todo-save-button"]`),r.cancelButton=e.querySelector(`[data-testid="test-todo-cancel-button"]`),r.editTitle=e.querySelector(`[data-testid="test-todo-edit-title"]`),r.editDescription=e.querySelector(`[data-testid="test-todo-edit-description"]`),r.editPriority=e.querySelector(`[data-testid="test-todo-edit-priority"]`),r.editDueDate=e.querySelector(`[data-testid="test-todo-edit-due-date"]`),i()}function o(e){e&&(e.isEditing!==void 0&&(n.isEditing=e.isEditing),e.isExpanded!==void 0&&(n.isExpanded=e.isExpanded),e.data&&(n.data={...n.data,...e.data}),i())}return{state:n,render:a,updateUI:i,setState:o,elements:r}}function d(e,t){let n=e.querySelector(`[data-testid="test-todo-time-remaining"]`),r=e.querySelector(`[data-testid="test-todo-overdue-indicator"]`);if(t.status===`Done`||t.completed)return n&&(n.textContent=`Completed`),r&&(r.hidden=!0),()=>{};let i=null;function a(){if((e.querySelector(`[data-testid="test-todo-status"]`)?.textContent||t.status)===`Done`||t.completed){n&&(n.textContent=`Completed`),r&&(r.hidden=!0),i&&=(clearInterval(i),null);return}n&&t.dueDate&&(n.textContent=s(t.dueDate)),r&&t.dueDate&&(r.hidden=!c(t.dueDate))}return a(),i=setInterval(a,3e4),()=>{i&&=(clearInterval(i),null)}}var f={id:`hng-task-0`,title:`Complete HNG Stage 0`,description:`Implement the Todo Card component with semantic HTML, accessibility features, and data-testid attributes.`,priority:`High`,status:`In Progress`,dueDateISO:`2026-04-16T22:59:59.000Z`,tags:[`hng`,`stage-0`,`frontend`],completed:!1},p=new Date(f.dueDateISO);f.dueDateFormatted=`${new Intl.DateTimeFormat(`en`,{dateStyle:`medium`}).format(p)}`,f.timeRemaining=`Due in 6 hours`;var m=document.querySelector(`#todo-card-container`);if(m){let e=u(m,f);e.render(),d(m,f);let t=null;function n(n){let i=[`input:not([disabled])`,`textarea:not([disabled])`,`select:not([disabled])`,`button:not([disabled])`].join(`, `),a=n.querySelectorAll(i),o=a[0],s=a[a.length-1];t=t=>{t.key===`Tab`&&(t.shiftKey&&document.activeElement===o?(t.preventDefault(),s.focus()):!t.shiftKey&&document.activeElement===s&&(t.preventDefault(),o.focus())),t.key===`Escape`&&(t.preventDefault(),e.setState({isEditing:!1}),e.elements.editButton&&e.elements.editButton.focus(),r())},n.addEventListener(`keydown`,t)}function r(){if(t){let n=e.elements.editForm;n&&n.removeEventListener(`keydown`,t),t=null}}if(e.elements.expandToggle){let t=e.elements.expandToggle;t.addEventListener(`click`,()=>{e.setState({isExpanded:!e.state.isExpanded})}),t.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.setState({isExpanded:!e.state.isExpanded}))})}e.elements.editButton&&e.elements.editButton.addEventListener(`click`,()=>{let{editTitle:t,editDescription:r,editPriority:i,editDueDate:a}=e.elements;t&&(t.value=e.state.data.title),r&&(r.value=e.state.data.description),i&&(i.value=e.state.data.priority),a&&(a.value=e.state.data.dueDate?e.state.data.dueDate.split(`T`)[0]:``),e.setState({isEditing:!0}),t&&t.focus(),e.elements.editForm&&n(e.elements.editForm)}),e.elements.cancelButton&&e.elements.cancelButton.addEventListener(`click`,()=>{e.setState({isEditing:!1}),e.elements.editButton&&e.elements.editButton.focus(),r()}),e.elements.editForm&&e.elements.editForm.addEventListener(`submit`,t=>{t.preventDefault();let{editTitle:n,editDescription:i,editPriority:a,editDueDate:o}=e.elements,s=n?.value?.trim(),c=i?.value?.trim(),l=a?.value,u=o?.value;if(!s){n?.focus();return}e.setState({isEditing:!1,data:{title:s,description:c,priority:l,dueDate:u?`${u}T00:00:00.000Z`:e.state.data.dueDate}}),e.elements.editButton&&e.elements.editButton.focus(),r()}),e.elements.checkbox&&e.elements.checkbox.addEventListener(`change`,t=>{let n=t.target.checked;e.setState({data:{completed:n,status:n?`Done`:e.state.data.status===`Done`?`Pending`:e.state.data.status}})}),e.elements.statusSelect&&e.elements.statusSelect.addEventListener(`change`,t=>{let n=t.target.value;e.setState({data:{status:n,completed:n===`Done`}})}),e.elements.deleteButton&&e.elements.deleteButton.addEventListener(`click`,()=>{console.log(`Delete button clicked for todo: "${e.state.data.title}"`)})}