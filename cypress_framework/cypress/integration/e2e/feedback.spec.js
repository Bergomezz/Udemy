import FeedbackPage from '../../page-objects/pages/FeedbackPage'

describe('Feedback Test Using Fixtures', () => {
	before(() => {
		FeedbackPage.load()
	})

	it('should submit feedback form', () => {
		FeedbackPage.submitFeedback()
	})
})
