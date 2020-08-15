import './index.css';
import {html, render} from 'lit-html';
import store from './stores';

class App extends HTMLElement {
  /**
   * Get page name
   */
  static get is() {
    return 'todo-app';
  }

  /**
   * Constructor
   */
  constructor() {
    super();
    this.me = null;
    this.list = [];
    // Unsubscribers for state
    this.unsbscribeUsers = null;
    this.unsbscribeTodos = null;
  }

  /**
   * Attach
   */
  connectedCallback() {
    this.fetch();
    this.ready();
    this.draw();
  }

  /**
   * Detach
   */
  disconnectedCallback() {
    !!this.unsbscribeUsers && this.unsbscribeUsers();
    !!this.unsbscribeTodos && this.unsbscribeTodos();
  }

  /**
   * Fetch
   */
  fetch() {
    const tasks = [
      store.dispatch('users.fetchMe'),
      store.dispatch('todos.fetchList')
    ];
    Promise.all(tasks).catch(err => console.error(err));;
  }

  /**
   * Ready for draw
   */
  ready() {
    this.list = store.getters('todos.list');
    this.unsbscribeTodos = store.subscribe('todos', () => {
      this.list = store.getters('todos.list');
      this.draw();
    });
    this.me = store.getters('users.me');
    this.unsbscribeUsers = store.subscribe('users', () => {
      this.me = store.getters('users.me');
      this.draw();
    });
  }

  /**
   * Draw
   */
  draw() {
    render(
      html`
        <h1>Todo App</h1>
        <div class="todos">
          <div class="user">UserName: ${this.me ? this.me.name : ''}</div>
          <form class="form" @submit=${this.dispatchAdd}>
            <input class="input" placeholder="new task" type="text">
            <input class="submit" type="submit" value="add">
          </form>
          <div class="list">
            ${this.list.map(
              (item) => html`
                <div class="item">
                  <div class="item__title ${item.checked ? 'item__title--checked' : ''}">${item.title}</div>
                  <input type="checkbox"
                    id=${item.id}
                    .checked=${item.checked}
                    @change=${this.dispatchToggle}
                  >
                  <button type="button"
                    id=${item.id}
                    @click=${this.dispatchRemove}
                  >
                    remove
                  </button>
                </div>
              `
            )}
          </div>
        </div>
      `,
      this
    );
  }

  /**
   * Dispath add
   */
  dispatchAdd(event) {
    event.preventDefault();
    const title = document.querySelector('.input').value;
    const payload = {
      title
    }
    store.dispatch('todos.add', payload);
  }

  /**
   * Dispath toggle
   */
  dispatchToggle(event) {
    const id = Number(event.currentTarget.id);
    const checked = event.currentTarget.checked;
    const payload = {
      id,
      checked
    }
    store.dispatch('todos.toggle', payload);
  }

  /**
   * Dispath remove
   */
  dispatchRemove(event) {
    const id = Number(event.currentTarget.id);
    const payload = {
      id
    }
    store.dispatch('todos.remove', payload);
  }
}

// Register customElement
!window.customElements.get(App.is) && window.customElements.define(App.is, App);
