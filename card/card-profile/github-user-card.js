const githubUserCard = {
    props: {
      username: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        user: {},
        loading: true,
        error: null
      };
    },
    mounted() {
      this.getUserData();
    },
    methods: {
      async getUserData() {
        try {
          const response = await axios.get(`https://api.github.com/users/${this.username}`);
          this.user = response.data;
          this.loading = false;
        } catch (error) {
          this.error = 'Ошибка загрузки данных';
          this.loading = false;
        }
      }
    },
    template: `
      <div v-if="loading" class="ui active loader"></div>
      <div v-else-if="error" class="ui message red">{{ error }}</div>
      <div v-else class="ui card">
        <div class="image">
          <img :src="user.avatar_url" alt="Avatar">
        </div>
        <div class="content">
          <a class="header">{{ user.login }}</a>
          <div class="meta">
            <span class="date">Joined on {{ new Date(user.created_at).toLocaleDateString() }}</span>
          </div>
          <div class="description">
            {{ user.bio || 'No bio available' }}
          </div>
        </div>
        <div class="extra content">
          <a>
            <i class="user icon"></i>
            {{ user.followers }} Followers
          </a>
        </div>
      </div>
    `
  };
  